const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const schema = makeExecutableSchema({ typeDefs, resolvers });

async function execute(query, variableValues, operationName, contextValue) {
  return graphql(
    schema,
    query,
    undefined,
    contextValue,
    variableValues,
    operationName
  );
}

module.exports = execute;
