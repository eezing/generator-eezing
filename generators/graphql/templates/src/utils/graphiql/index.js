'use strict';

const fs = require('fs').promises;

module.exports = () => {
  const htmlPromise = fs.readFile(__dirname + '/index.html', 'utf-8');

  return async function(req, res) {
    res.set('Content-Type', 'text/html');
    res.send(await htmlPromise);
  };
};
