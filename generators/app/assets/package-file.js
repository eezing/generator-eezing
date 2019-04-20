module.exports = () => ({
  main: 'src/index.js',
  scripts: {
    dev: 'NODE_ENV=development nodemon -r dotenv/config src/index.js'
  }
});
