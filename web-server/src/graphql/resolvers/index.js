const rates = require("./rates");
const ExchangeRates = require("./ExchangeRates");
const registerUser = require("./registerUser");
const loginUser = require("./loginUser");

// Combine all resolvers
module.exports = {
  Query: {
    rates: rates,
  },
  Mutation: {
    registerUser: registerUser,
    loginUser: loginUser,
  },
  ExchangeRate: ExchangeRates,
};

// Add new resolvers in this resolvers folder
// Resolver example:
// module.exports = (_parent, args, _context, _info) => (logics);
