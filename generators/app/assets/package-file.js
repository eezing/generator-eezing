'use strict';

module.exports = () => ({
  main: 'src/index.js',
  scripts: {
    start: 'node -r dotenv/config src/index.js',
    dev: 'NODE_ENV=development nodemon -r dotenv/config src/index.js'
  }
});
