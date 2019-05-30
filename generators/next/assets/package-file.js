module.exports = () => ({
  scripts: {
    start: 'next start',
    dev: 'next',
    build: 'next build'
  },
  eslintConfig: {
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      node: true,
      jest: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
    settings: {
      react: {
        version: '16.0'
      }
    },
    rules: {
      'react/display-name': 0,
      'no-console': 2
    },
    parser: 'babel-eslint',
    plugins: ['prettier']
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
