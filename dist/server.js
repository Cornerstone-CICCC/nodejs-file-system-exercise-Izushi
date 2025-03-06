"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Check the README.md file for instructions to the exercise
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const url_1 = __importDefault(require("url"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const directory = "images";
const filePath = path_1.default.join(__dirname, "./", directory);
const server = http_1.default.createServer((req, res) => {
    const { method } = req;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const { pathname, query } = parsedUrl;
    const fileName = query.filename;
    // Home
    if (pathname === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello from my server!");
        return;
    }
    // Read file
    if (pathname === "/view-image" && method === "GET") {
        if (fileName) {
            const imagePath = path_1.default.join(filePath, fileName);
            fs_1.default.readFile(imagePath, (err, data) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/plain" });
                    res.end("Internal Server Error");
                    return;
                }
                res.writeHead(200, { "Content-Type": "image/jpeg" });
                res.end(data);
            });
        }
        else {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("filename query parameter is missing");
        }
        return;
    }
    // 404 Fallback
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found!");
    return;
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
