const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const mime = require('mime-types');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const routes = {
  '/': 'index.html',
  '/style.css': 'style.css',
  '/app.js': 'app.js',
};

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const contentType = mime.lookup(filePath) || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const fileName = routes[req.url];

  if (!fileName) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  serveFile(path.join(PUBLIC_DIR, fileName), res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});