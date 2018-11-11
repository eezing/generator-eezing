'use strict';

module.exports = ({ name, description, author }) => ({
  name,
  description,
  version: '0.0.1',
  author,
  license: 'ISC',
  keywords: [],
  main: 'src/index.js',
  scripts: {
    start: 'node -r dotenv/config src/index.js',
    dev: 'NODE_ENV=development nodemon -r dotenv/config src/index.js',
    pretty: "prettier --write '**/*.js'",
    test: ' npm run test:lint && npm run test:jest',
    'test:watch': 'jest --watch',
    'test:jest': 'jest --coverage',
    'test:lint': 'eslint ./ --ext .js'
  },
  dependencies: {},
  devDependencies: {},
  husky: {
    hooks: {
      'pre-commit': 'npm run test:lint'
    }
  },
  prettier: {
    semi: true,
    bracketSpacing: true,
    singleQuote: true
  },
  eslintConfig: {
    env: {
      commonjs: true,
      es6: true,
      node: true,
      jest: true
    },
    parser: 'babel-eslint',
    plugins: ['prettier'],
    extends: ['eslint:recommended', 'prettier'],
    rules: {
      'no-console': 2
    }
  },
  eslintIgnore: ['coverage'],
  jest: {
    testURL: 'http://localhost/'
  }
});
