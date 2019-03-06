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

const listener = server.listen(PORT, err => {
  if (err) throw err;
  //eslint-disable-next-line
  console.log(`> Ready on http://localhost:${listener.address().port}`);
});
