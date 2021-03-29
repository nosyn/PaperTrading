import { gql } from "@apollo/client";

// fragments
import UserInfoFragment from "../fragments/UserInfoFragment";

const LOGOUT_USER = gql`
  ${UserInfoFragment}
  mutation LOGOUT_USER {
    logoutUser {
      ...UserInfoFragment
    }
  }
`;

export default LOGOUT_USER;
