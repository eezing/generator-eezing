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
    test: 'npm run test:jest && npm run test:lint',
    'test:watch': 'jest --watch',
    'test:jest': 'jest --coverage',
    'test:lint': 'eslint src --ext .js --ext .mjs'
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
  jest: {
    testURL: 'http://localhost/'
  }
});
