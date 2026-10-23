const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

function startServer(portToTry) {
  server.listen(portToTry, () => {
    console.log(`\n========================================`);
    console.log(`⚡ Glitches & Giggles Server Running!`);
    console.log(`👉 Open: http://localhost:${portToTry}`);
    console.log(`========================================\n`);
  });
}

// Gracefully handle port in use by trying the next port automatically
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`⚠️ Port ${PORT} is busy, trying port ${PORT + 1}...`);
    PORT += 1;
    startServer(PORT);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);
