import { gql } from "@apollo/client";

export default gql`
  query GET_USER {
    getUser {
      name
      email
    }
  }
`;
