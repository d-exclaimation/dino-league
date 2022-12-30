//
//  AuthProvider.tsx
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

//
//  AuthProvider.tsx
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import type { FC, ReactNode } from "react";
import { useMeQuery } from "../graphql";
import { AuthContext } from "./AuthContext";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const { data, loading } = useMeQuery();
  return (
    <AuthContext.Provider
      value={{
        user: data?.me,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
