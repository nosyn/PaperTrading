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

  type UserInfo {
    name: String!
    email: String!
  }

  type JwtToken {
    jwtToken: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    rates(currency: String!): [ExchangeRate]
    getUser: JwtToken!
    ping: String!
  }

  # The "Mutation" type is special: it lists all of the available mutations that
  # clients can execute, along with the return type for each.
  type Mutation {
    registerUser(input: RegisterInput!): UserInfo!
    loginUser(input: LoginInput!): JwtToken!
    logoutUser: UserInfo!
  }

  # The "Subscription" type is special: it lists all of the available subscriptions that
  # clients can execute, along with the return type for each.

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
