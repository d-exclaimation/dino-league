//
//  withAuthRedirect.ts
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { useAuth } from "@dino/apollo";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export function withAuthRedirect<C extends object>(Component: FC<C>): FC<C> {
  return (props) => {
    const nav = useNavigate();
    const { user, loading } = useAuth();

    if (!loading && !user) {
      nav("/login");
    }
    return <Component {...props} />;
  };
}
