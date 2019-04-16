const connectionString = process.env.POSTGRES_CONNECTION;
const knex = require('knex');

const client = knex({
  client: 'pg',
  connection: connectionString
});

module.exports = client;
