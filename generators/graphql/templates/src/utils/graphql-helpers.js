const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const createRandomBytesAsync = promisify(crypto.randomBytes);

module.exports = {
  schemaFileLoader,
  withResolverErrorHandler,
  resolverErrorHandler
};

function schemaFileLoader(basePath) {
  return (...target) =>
    target.reduce(
      (out, file) => `${out}
    ${fs.readFileSync(path.resolve(basePath, file + '.gql'))}`,
      ''
    );
}

function withResolverErrorHandler(resolversObject) {
  return Object.keys(resolversObject).reduce(
    (r, k) => ({
      ...r,
      [k]: resolverErrorHandler(resolversObject[k])
    }),
    {}
  );
}

function resolverErrorHandler(resolver) {
  return async (...args) => {
    try {
      return await resolver(...args);
    } catch (error) {
      error.error_ref = await randomHexAsync(6);
      console.error(error); //eslint-disable-line
      return error;
    }
  };
}

function randomHexAsync(size) {
  return createRandomBytesAsync(size).then(buf => buf.toString('hex'));
}
