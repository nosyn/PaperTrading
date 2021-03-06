// Resolvers for mutation
// https://www.apollographql.com/docs/tutorial/resolvers/#the-resolver-function-signature

module.exports = (_parent, args, _context, _info) => ({
  title: args.title,
  author: {
    name: args.author,
  },
});
