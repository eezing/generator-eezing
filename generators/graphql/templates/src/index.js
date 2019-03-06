const PORT = process.env.PORT;
const express = require('express');
const bodyParser = require('body-parser');
const graphql = require('./graphql');

const app = express();

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());

app.post('/graphql', async (req, res) => {
  try {
    const context = {};

    const result = await graphql(
      req.body.query,
      req.body.variables,
      req.body.operationName,
      context
    );

    //eslint-disable-next-line
    console.dir(
      {
        method: req.method,
        context
      },
      { depth: null, colors: true }
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
