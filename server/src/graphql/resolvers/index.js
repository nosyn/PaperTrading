const books = require("./books");
const authors = require("./authors");
const addBook = require("./addBook");

// Combine all resolvers
module.exports = {
  Query: {
    books: books,
    authors: authors,
  },
  Mutation: {
    addBook: addBook,
  },
};
