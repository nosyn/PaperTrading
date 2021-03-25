// ? https://www.apollographql.com/docs/react/networking/advanced-http-networking/
// ? https://www.apollographql.com/docs/react/networking/authentication/
import { ApolloLink, HttpLink } from "@apollo/client";
import jwtManager from "./jwtManager";

// config
import apolloClientConfigs from "../../configs";

export const authMiddleware = new ApolloLink((operation, forward) => {
  // get the authentication jwt token from jwt manager if it exists
  const token = jwtManager.getJWT();
  console.log(token);
  if (token) {
    const oldHeaders = operation.getContext().headers || {};
    // set the headers to the context
    operation.setContext({
      headers: {
        ...oldHeaders,
        authorization: `Bearer ${token}`,
      },
    });
  }

  return forward(operation).map((response) => {
    const { errors, data } = response;
    // We should not do this if there are errors
    if (!errors) {
      // Set the JWT on certain operations
      switch (operation.operationName) {
        case "LOGIN_USER":
          jwtManager.setJWT(data?.loginUser?.jwtToken);
          break;
        // case "REFRESH_MY_JWT":
        //   jwtManager.setJWT(data?.loginUser?.jwt);
        //   break;
        default:
          break;
      }
    }
    return response;
  });
});

//
export const httpLink = new HttpLink({
  uri: apolloClientConfigs.uri,
  credentials: "include",
});

export default authMiddleware.concat(httpLink);
