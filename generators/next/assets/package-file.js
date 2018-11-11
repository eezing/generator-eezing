'use strict';

module.exports = () => ({
  scripts: {
    start: 'next start',
    build: 'next build',
    dev: 'next'
  },
  prettier: {
    jsxBracketSameLine: true
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
  jest: {
    setupFiles: ['<rootDir>/jest.setup.js'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/']
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
  }
});
