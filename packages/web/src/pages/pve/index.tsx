//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import {
  Arena,
  BattleEnd,
  BattleInit,
  BattleTurn,
  BattlingDinoInfoFragment,
  useAuth,
  useQuestMutation,
} from "@dino/apollo";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Color } from "../../common/Styling";
import BattleView from "../common/BattleView";

type BattleDinoDisplay = {
  damage?: number;
  dino: BattlingDinoInfoFragment;
  remaining: number;
  attacking: boolean;
};

type Battling = {
  yours: BattlingDinoInfoFragment;
  opponents: BattlingDinoInfoFragment;
};

type BattlePlan =
  | BattleEnd
  | (Omit<BattleInit, "yours" | "opponents"> & Battling)
  | (Omit<BattleTurn, "yours" | "opponents"> & Battling);

const damageColor = (num: number, hp: number): Color.Bg => {
  const percentage = Math.round((num * 100) / hp);
  if (percentage < 25) return "bg-sky-400";
  if (percentage < 50) return "bg-green-400";
  if (percentage < 75) return "bg-amber-400";
  return "bg-red-400";
};

const hpColor = (percentage: number): Color.Text => {
  if (percentage < 33) return "text-red-500";
  if (percentage < 67) return "text-amber-500";
  return "text-green-500";
};

const PvEPage: FC = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [quest] = useQuestMutation();

  const start = useCallback(async () => {
    const { data, errors } = await quest({
      refetchQueries: ["PartyView"],
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
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-t from-white to-[#C0B2A2]">
      <button className="fixed top-2 right-2" onClick={() => nav("/")}>
        <img className="w-10 md:w-12" src="/back.svg" />
      </button>
      <BattleView location={user?.location ?? Arena.Desert} start={start} />
    </div>
  );
};

export default PvEPage;
