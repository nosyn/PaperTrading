import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation REGISTER_USER($input: RegisterInput!) {
    registerUser(input: $input) {
      name
      email
      message
    }
  }
`;

export default REGISTER_USER;
