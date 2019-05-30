'use strict';

const PORT = process.env.PORT;

const express = require('express');
const morgan = require('morgan');
const jsonBodyParser = require('body-parser').json;
const { main } = require('./src');

const app = express();

app.use(jsonBodyParser());

app.use(morgan('dev'));

app.use('/main', main);

app.listen(PORT, () => {
  console.log(`\n> listening at http://localhost:${PORT}`); //eslint-disable-line
});
