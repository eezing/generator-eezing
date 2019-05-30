'use strict';

const { withResolverErrorHandler } = require('../utils/graphql-helpers');

const Query = withResolverErrorHandler({
  user: (parent, args, ctx) =>
    ctx.loaders.userGet(args.id || ctx.user_id, ctx.user)
});

module.exports = { Query };
