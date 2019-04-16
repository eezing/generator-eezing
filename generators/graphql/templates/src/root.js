const { withRootErrorHandler } = require('./utils/graphql-helpers');

module.exports = withRootErrorHandler({
  memberCreate: (args, { loaders }) => loaders.memberCreate(args.member),
  memberById: (args, { loaders }) => loaders.memberById.load(args.id)
});
