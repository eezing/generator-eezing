'use strict';

const { schemaFileLoader } = require('../utils/graphql-helpers');
const loadFiles = schemaFileLoader(__dirname);

module.exports = loadFiles('Query', 'User');
