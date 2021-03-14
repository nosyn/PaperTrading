import { gql } from "@apollo/client";

const LOGIN_USER = gql`
  mutation LOGIN_USER($input: LoginInput!) {
    loginUser(input: $input) {
      name
      email
    }
  }
`;

export default LOGIN_USER;
