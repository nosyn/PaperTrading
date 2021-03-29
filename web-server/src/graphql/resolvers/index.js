// Queries
const rates = require("./rates");
const ExchangeRates = require("./ExchangeRates");
const getUser = require("./getUser");
const ping = require("./ping");

// Mutations
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");

// Combine all resolvers
module.exports = {
  Query: {
    rates,
    getUser,
    ping,
  },
  Mutation: {
    registerUser,
    loginUser,
    logoutUser,
  },
  ExchangeRate: ExchangeRates,
};

// Add new resolvers in this resolvers folder
// Resolver example:
// module.exports = (_parent, args, _context, _info) => (logics);
