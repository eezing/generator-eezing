'use strict';

module.exports = () => ({
  main: 'src/index.js',
  scripts: {
    test: 'npm run test:jest && npm run test:lint',
    'test:watch': 'jest --watch',
    'test:jest': 'jest --coverage',
    'test:lint': 'eslint src --ext .js --ext .mjs'
  },
  jest: {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
  },
  eslintConfig: {
    env: {
      browser: true
    },
    extends: ['plugin:react/recommended'],
    settings: {
      react: {
        version: '16.0'
      }
    },
    rules: {
      'react/display-name': 0
    }
  },
  babel: {
    env: {
      development: {
        presets: ['next/babel']
      },
      production: {
        presets: ['next/babel']
      },
      test: {
        presets: [['next/babel', { 'preset-env': { modules: 'commonjs' } }]]
      }
    }
  },
  prettier: {
    jsxBracketSameLine: true
  }
});
