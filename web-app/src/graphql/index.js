// Apollo Client
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { fetch } from "node-fetch";
import { apolloClientConfigs } from "../configs";

export default new ApolloClient({
  link: new HttpLink({ uri: apolloClientConfigs.uri, fetch }),
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query GetRates {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `,
//   })
//   .then((result) => {
//     console.log(result);
//     console.log("inside");
//   });
