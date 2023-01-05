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

import { FC, ReactNode, useCallback } from "react";
import { useMeQuery } from "../graphql";
import { AuthContext } from "./AuthContext";

type Props = {
  children: ReactNode;
};

const AuthProvider: FC<Props> = ({ children }) => {
  const { data, loading, refetch: fetch } = useMeQuery();

  const refetch = useCallback(async () => {
    await fetch();
  }, [fetch]);

  return (
    <AuthContext.Provider
      value={{
        user: data?.me,
        loading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
