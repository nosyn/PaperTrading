import { gql } from "@apollo/client";

export default gql`
  mutation registerUser($name: String!, $email:String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password){
        name
        email
        message
    }
`;
