//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_req, { headers }) => {
  const token = !!window ? window.localStorage.getItem("token") : null;

  if (!token) {
    return { headers };
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloReactProvider: FC<Props> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloReactProvider;
