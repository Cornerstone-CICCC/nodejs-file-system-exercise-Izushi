// Check the README.md file for instructions to the exercise
import http from 'http'
import fs from 'fs'
import path from 'path'
import url from 'url'
import dotenv from 'dotenv'
dotenv.config()

const directory = "images"
const filePath = path.join(__dirname, "./", directory)

const server = http.createServer((req, res) => {
  const { method } = req
  const parsedUrl = url.parse(req.url || '', true)
  const { pathname, query } = parsedUrl
  const fileName = query.filename as string | null

  // Home
  if (pathname === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" })
    res.end("Hello from my server!")
    return;
  }

  // Read file
  if (pathname === "/view-image" && method === "GET") {
    if (fileName) {
      const imagePath = path.join(filePath, fileName)
      fs.readFile(imagePath, (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" })
          res.end("Internal Server Error")
          return
        }
        res.writeHead(200, { "Content-Type": "image/jpeg" })
        res.end(data)
      })
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" })
      res.end("filename query parameter is missing")
    }
    return
  }

  // 404 Fallback
  res.writeHead(404, { "Content-Type": "text/plain" })
  res.end("Not Found!")
  return
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
