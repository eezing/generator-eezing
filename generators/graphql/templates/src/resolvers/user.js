module.exports = (parent, args, ctx) =>
  ctx.loaders.getUser(args.id || ctx.user_id);
