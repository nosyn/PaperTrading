const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  playground: process.env.NODE_ENV != "production",
  introspection: process.env.NODE_ENV != "production",
  context: ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      return {
        response: connection,
        reqResponse: req.res,
        currentUser: req.currentUser,
      };
    }
  },
});
