//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { Arena, useAuth, useQuestMutation } from "@dino/apollo";
import { FC, useCallback } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import BattleView from "../common/BattleView";
import HomeButton from "../common/HomeButton";

const PvEPage: FC = () => {
  const { user } = useAuth();
  const [quest] = useQuestMutation();

  const start = useCallback(async () => {
    const { data, errors } = await quest({
      refetchQueries: ["PartyView", "Me"],
    });
    if (!data || errors) return [];

    switch (data.quest.__typename) {
      case "Unauthorized":
        return [];
      case "Battle":
        return data.quest.plan;
    }
  }, [quest]);

  return (
    <div className="flex items-center justify-center w-screen h-screen background">
      <HomeButton />
      <BattleView location={user?.location ?? Arena.Desert} start={start} />
    </div>
  );
};

export default withAuthRedirect(PvEPage);
