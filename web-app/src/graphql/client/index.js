// Apollo Client
import { ApolloClient, InMemoryCache, from } from "@apollo/client";

// Authentication middleware
import authMiddleware from "./authMiddleware";

export default new ApolloClient({
  link: from([authMiddleware]),
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
});
