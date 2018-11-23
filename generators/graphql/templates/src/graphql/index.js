'use strict';

const { buildSchema, graphql } = require('graphql');
const sdl = require('./schema');
const rootValue = require('./root');

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
