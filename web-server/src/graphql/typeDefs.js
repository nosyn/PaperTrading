const { gql } = require("apollo-server");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ### Queries start here
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
    publisher: String
    year: Int
  }

  type Author {
    name: String
    books: [Book]
  }

  type ExchangeRate {
    currency: String
    rate: String
    name: String
  }

  type User {
    name: String!
    email: String!
    password: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    users: [User]
    rates(currency: String!): [ExchangeRate]
  }

  type Mutation {
    addBook(title: String, author: String): Book
    registerUser(input: RegisterInput!): User!
  }

  ### Inputs start here
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }
`;
