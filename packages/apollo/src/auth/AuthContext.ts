//
//  AuthContext.ts
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { createContext } from "react";
import type { MeQuery } from "../graphql";

export const AuthContext = createContext<{
  user: MeQuery["me"];
  loading: boolean;
}>({
  user: null,
  loading: false,
});
