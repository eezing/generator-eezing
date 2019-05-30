'use strict';

const PORT = process.env.PORT;

const express = require('express');
const morgan = require('morgan');
const jsonBodyParser = require('body-parser').json;
const Context = require('./src/Context');
const graphql = require('./src');
const graphiql = require('./src/utils/graphiql');

const app = express();

app.use(jsonBodyParser());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.headers.host}${req.path}`); //eslint-disable-line
  next();
});

app.get('/graphql', graphiql());

app.post('/graphql', async (req, res) => {
  try {
    const user = {
      id: 'c871642c-0805-4829-b84d-496f118c39a6',
      tenant_id: '53e7a8b3-9d4e-409c-b831-6a61d092cc37',
      name: 'Luke Skywalker'
    };

    const context = new Context(user);

    const result = await graphql(
      req.body.query,
      req.body.variables,
      req.body.operationName,
      context
    );

    res.send(result);
  } catch (error) {
    res.status(500).send();
    console.error(error); //eslint-disable-line
  }
});

app.listen(PORT, () => {
  console.log(`\n> listening at http://localhost:${PORT}`); //eslint-disable-line
});
