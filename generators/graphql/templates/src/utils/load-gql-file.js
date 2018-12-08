'use strict';

const fs = require('fs');
const path = require('path');

module.exports = rootPath => (...target) =>
  target.reduce(
    (out, file) => `${out}
    ${loadFile(rootPath, file)}`,
    ''
  );

function loadFile(rootPath, filename) {
  return fs.readFileSync(path.resolve(rootPath, filename + '.gql'));
}
