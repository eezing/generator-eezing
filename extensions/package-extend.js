'use strict';

const deepExtend = require('deep-extend');

module.exports = function(pkgA) {
  const pkgB = this.fs.readJSON(this.destinationPath('package.json')) || {};

  this.fs.writeJSON(
    this.destinationPath('package.json'),
    orderBy(deepExtend(pkgB, pkgA), getOrder())
  );
};

function getOrder() {
  return [
    'name',
    'description',
    'version',
    'author',
    'license',
    'keywords',
    'main',
    'scripts',
    'husky',
    'prettier',
    'eslintConfig',
    'eslintIgnore',
    'babel',
    'jest'
  ];
}

function orderBy(target, by) {
  const map = new Map(Object.keys(target).map(k => [k, target[k]]));
  const result = {};

  by.forEach(k => {
    const v = map.get(k);

    if (v !== undefined) {
      result[k] = v;
      map.delete(k);
    }
  });

  map.forEach((v, k) => (result[k] = v));

  return result;
}
