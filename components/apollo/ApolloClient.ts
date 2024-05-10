import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://ezhealth.adaptable.app/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
