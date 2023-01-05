//
//  main.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import {
  ApolloClient,
  ApolloProvider,
  createHttpWithAuthLink,
  InMemoryCache,
} from "@dino/apollo";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  link: createHttpWithAuthLink({
    uri: "http://localhost:4000/graphql",
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
