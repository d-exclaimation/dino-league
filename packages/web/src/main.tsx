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
import App from "./App";
import "./index.css";

window?.localStorage?.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNsYnNqa25uNDAwMDA3dGFmc2RpYzhhbGgiLCJpYXQiOjE2NzIzNzM3NTUsImlzcyI6ImRpbm86bm9kZTpzZXJ2ZXIiLCJhdWQiOiJkaW5vOndlYjpjbGllbnQiLCJleHAiOjE2NzI5Nzg1NTV9.9Jyk13fZ8-YqzDC93hy-eg7yF7aIdDRWhIuqyPuYXEc"
);

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
