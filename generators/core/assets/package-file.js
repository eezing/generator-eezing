module.exports = ({ name, description, author }) => ({
  name,
  description,
  version: '0.0.1',
  author,
  license: 'ISC',
  keywords: [],
  scripts: {
    pretty: "prettier --write '**/*.js'",
    test: ' npm run test:lint && npm run test:jest',
    'test:watch': 'jest --watch',
    'test:jest': 'jest --coverage',
    'test:lint': 'eslint ./ --ext .js'
  },
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
  eslintIgnore: ['coverage', '*.min.js'],
  jest: {
    testURL: 'http://localhost/'
  },
  dependencies: {},
  devDependencies: {}
});
