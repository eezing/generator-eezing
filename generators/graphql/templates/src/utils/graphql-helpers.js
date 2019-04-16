'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const createRandomBytesAsync = promisify(crypto.randomBytes);

module.exports = {
  queryHasField,
  LoadSchemaFile,
  withRootErrorHandler
};

function queryHasField(ast, fieldName) {
  const selections = ast.fieldNodes[0].selectionSet.selections;
  let has = false;

  for (let i = 0, l = selections.length; i < l; i++) {
    if (selections[i].name.value === fieldName) {
      has = true;
      break;
    }
  }

  return has;
}

function LoadSchemaFile(rootPath) {
  return (...target) =>
    target.reduce(
      (out, file) => `${out}
    ${fs.readFileSync(path.resolve(rootPath, file + '.gql'))}`,
      ''
    );
}

function withRootErrorHandler(rootObject) {
  return Object.keys(rootObject).reduce(
    (r, k) => ({
      ...r,
      [k]: withResolverErrorHandler(rootObject[k])
    }),
    {}
  );
}

function withResolverErrorHandler(resolver) {
  return async (...args) => {
    try {
      return await resolver(...args);
    } catch (error) {
      error.error_ref = await randomHexAsync(6);
      console.error(error); //eslint-disable-line
      return new Error(`Internal Error, error_ref: ${error.error_ref}`);
    }
  };
}

function randomHexAsync(size) {
  return createRandomBytesAsync(size).then(buf => buf.toString('hex'));
}
