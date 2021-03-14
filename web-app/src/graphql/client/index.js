// Apollo Client
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { fetch } from "node-fetch";
import { apolloClientConfigs } from "../../configs";

export default new ApolloClient({
  link: new HttpLink({ uri: apolloClientConfigs.uri, fetch }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      // disable caching on the queries.
      // avoids getting wrong initial API fetch results on sign-out/sign-in
      fetchPolicy: "no-cache",
    },
    mutate: {
      // disable caching on the mutations.
      // primarily avoids image uploads + caching slowing
      // everything down.
      fetchPolicy: "no-cache",
    },
  },
  credentials: "include",
});
