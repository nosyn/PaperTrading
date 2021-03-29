import { gql } from "@apollo/client";

const JwtTokenFragment = gql`
  fragment JwtTokenFragment on JwtToken {
    jwt
  }
`;

export default JwtTokenFragment;
