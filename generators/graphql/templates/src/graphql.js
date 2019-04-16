const { buildSchema, graphql } = require('graphql');
const rootValue = require('./root');
const sdl = require('./utils/graphql-helpers').LoadSchemaFile(__dirname)(
  'schema'
);

const schema = buildSchema(sdl, { commentDescriptions: true });

async function execute(query, variableValues, operationName, contextValue) {
  return graphql(
    schema,
    query,
    rootValue,
    contextValue,
    variableValues,
    operationName
  );
}

module.exports = execute;
