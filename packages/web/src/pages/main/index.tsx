//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { useAuth } from "@dino/apollo";
import type { FC } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import LoadingBar from "../common/LoadingBar";

const MainPage: FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingBar />;
  }

  return <div>{user?.id}</div>;
};

export default withAuthRedirect(MainPage);
