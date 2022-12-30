//
//  useAuth.ts
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
