import { split, HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const wsLink = new WebSocketLink({
  uri: `wss://course-hasura.herokuapp.com/v1/graphql`,

  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "cobacoba",
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: "https://course-hasura.herokuapp.com/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "cobacoba",
  },
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
