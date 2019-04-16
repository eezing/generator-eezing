const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const graphql = require('./graphql');
const createLoaders = require('./loaders');

const app = express();

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());

app.post('/graphql', async (req, res) => {
  try {
    const tenant = {
      id: '53e7a8b3-9d4e-409c-b831-6a61d092cc37',
      code: 'nextgen',
      name: 'Next Generation'
    };

    const user = {
      id: 'c871642c-0805-4829-b84d-496f118c39a6',
      name: 'Luke Skywalker'
    };

    const context = {
      tenant,
      user,
      loaders: createLoaders(tenant, user)
    };

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

const listener = app.listen(PORT, err => {
  if (err) throw err;
  //eslint-disable-next-line
  console.log(`> Ready on http://localhost:${listener.address().port}`);
});
