'use strict';

const PORT = process.env.PORT;

const express = require('express');
const jsonBodyParser = require('body-parser').json;
const { main } = require('./src');

const app = express();

app.use(jsonBodyParser());

app.use((req, res, next) => {
  console.log(`\n--- ${req.method} ${req.headers.host}${req.path} ---\n`); //eslint-disable-line
  console.dir({ body: req.body, query: req.query, headers: req.headers }); //eslint-disable-line
  console.log('\n--------------------------------\n'); //eslint-disable-line
  next();
});

app.use('/main', main);

app.listen(PORT, () => {
  console.log(`\n> listening at http://localhost:${PORT}`); //eslint-disable-line
});
