const { gql } = require("apollo-server");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
module.exports = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ### Queries start here
  type ExchangeRate {
    currency: String
    rate: String
    name: String
  }

  type User {
    name: String!
    email: String!
  }

  type RegisterUser {
    name: String!
    email: String!
    message: String!
  }

  type LoginUser {
    name: String!
    email: String!
    jwt_token: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    users: [User]
    rates(currency: String!): [ExchangeRate]
  }

  type Mutation {
    registerUser(input: RegisterInput!): RegisterUser!
    loginUser(input: LoginInput!): LoginUser!
  }

  ### Inputs start here
  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
