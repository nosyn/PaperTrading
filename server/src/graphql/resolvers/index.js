const books = require("./books");
const authors = require("./authors");
const addBook = require("./addBook");
const rates = require("./rates");
const ExchangeRates = require("./ExchangeRates");

const fetch = require("node-fetch");

// Combine all resolvers
module.exports = {
  Query: {
    books: books,
    authors: authors,
    rates: rates,
  },
  Mutation: {
    addBook: addBook,
  },
  ExchangeRate: ExchangeRates,
};

// Add new resolvers in this resolvers folder
// Resolver example:
// module.exports = (_parent, args, _context, _info) => (logics);