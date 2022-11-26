//
//  main.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import React from "react";
import ReactDOM from "react-dom/client";
import ApolloReactProvider from "./apollo";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloReactProvider>
      <App />
    </ApolloReactProvider>
  </React.StrictMode>
);
