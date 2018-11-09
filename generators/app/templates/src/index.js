'use strict';

if (process.env.USE_DOTENV === 'true') require('dotenv').config();

const PORT = process.env.PORT;
const url = require('url');
const http = require('http');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);

  if (pathname === '/healthz') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!\n');
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); //eslint-disable-line
});
