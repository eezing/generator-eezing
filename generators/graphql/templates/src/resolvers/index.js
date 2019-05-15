const { withResolverErrorHandler } = require('../utils/graphql-helpers');
const user = require('./user');

const Query = withResolverErrorHandler({
  user
});

module.exports = { Query };
