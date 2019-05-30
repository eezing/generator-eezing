'use strict';

module.exports = () => ({
  main: 'src/index.js',
  scripts: {
    dev: 'PORT=3000 NODE_ENV=development nodemon -r dotenv/config dev.js'
  }
});
