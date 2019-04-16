module.exports = () => ({
  main: 'src/index.js',
  scripts: {
    dev: 'NODE_ENV=development nodemon -r dotenv/config src/index.js -e js,gql',
    'postgres-reset':
      'sh ./src/loaders/sources/postgres/schema/create-database.sh radical ./src/loaders/sources/postgres/schema/schema.sql'
  }
});
