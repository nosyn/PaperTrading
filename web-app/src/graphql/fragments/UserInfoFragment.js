import { gql } from "@apollo/client";

const UserInfoFragment = gql`
  fragment UserInfoFragment on UserInfo {
    name
    email
  }
`;

export default UserInfoFragment;
