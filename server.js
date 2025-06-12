const http = require('http');
const fs = require('fs');
const url = require('url');

// Create server
http.createServer(function (req, res) {
  const q = url.parse(req.url, true); // parse query
  const pathname = q.pathname;

  if (pathname === '/') {
    // Serve index.html
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end("404 Not Found");
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } else if (pathname === '/greet') {
    // Read name from query string
    const name = q.query.name || "Guest";
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>Hello, ${name}!</h1>`);
    res.end();
  } else {
    // Handle unknown routes
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("404 Not Found");
  }
}).listen(8080); // Run on port 8080

console.log("Server running at http://localhost:8080/");
