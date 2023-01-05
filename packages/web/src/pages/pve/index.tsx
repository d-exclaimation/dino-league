//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { Union } from "@d-exclaimation/union";
import {
  BattleEnd,
  BattleInit,
  BattleTurn,
  BattlingDinoInfoFragment,
  useAuth,
  useQuestMutation,
} from "@dino/apollo";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type BattleState = Union<{
  loading: {};
  battling: {
    yours: BattlingDinoInfoFragment;
    opponents: BattlingDinoInfoFragment;
  };
}>;

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

const PvEPage: FC = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const [quest] = useQuestMutation();
  const timeoutRef = useRef<number | null>(null);
  const [yours, setYours] = useState<BattleDinoDisplay | null>(null);
  const [opponents, setOpponents] = useState<BattleDinoDisplay | null>(null);

  const bgImg = useMemo(
    () => `${user?.location.toLowerCase() ?? "desert"}.webp`,
    [user]
  );

  const applyEvent = useCallback(
    (plan: BattlePlan[]) => {
      if (!plan.length) return;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      const [head, ...tail] = plan;
      switch (head.__typename) {
        case "BattleEnd":
          return;
        case "BattleInit":
          setYours((prev) => {
            const newState = {
              dino: head.yours,
              remaining: head.yoursRemaining,
            };
            return prev
              ? { ...prev, ...newState }
              : { ...newState, attacking: false };
          });
          setOpponents((prev) => {
            const newState = {
              dino: head.opponents,
              remaining: head.opponentsRemaining,
            };
            return prev
              ? { ...prev, ...newState }
              : { ...newState, attacking: false };
          });
          timeoutRef.current = setTimeout(() => applyEvent(tail), 500);
          break;
        case "BattleTurn":
          const { attacking, yours, opponents } = head;

          timeoutRef.current = setTimeout(() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            setYours((prev) => {
              const newState = {
                dino: yours,
                attacking,
              };
              return prev ? { ...prev, ...newState } : prev;
            });
            setOpponents((prev) => {
              const newState = {
                dino: opponents,
                attacking: !attacking,
              };
              return prev ? { ...prev, ...newState } : prev;
            });

            timeoutRef.current = setTimeout(() => {
              setYours((prev) => (prev ? { ...prev, attacking: false } : prev));
              setOpponents((prev) =>
                prev ? { ...prev, attacking: false } : prev
              );

              applyEvent(tail);
            }, 400);
          }, 500);
          break;
      }
    },
    [setYours, setOpponents]
  );

  const startQuest = useCallback(async () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const { data, errors } = await quest();
    if (!data || errors) return;

    switch (data.quest.__typename) {
      case "Unauthorized":
        return;
      case "Battle":
        const plan = data.quest.plan;
        timeoutRef.current = setTimeout(() => applyEvent(plan), 0);
    }
  }, [quest, applyEvent]);

  return (
    <div
      className="flex items-center justify-center w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url('/bg/${bgImg}')`,
      }}
    >
      <button className="fixed top-2 right-2" onClick={() => nav("/")}>
        <img className="w-10 md:w-12" src="/back.svg" />
      </button>
      <div className="flex flex-col items-center justify-center max-w-3xl h-1/2 w-[90%] bg-white/20 rounded-lg">
        <div className="flex items-center justify-between px-5 py-2 w-full h-4/6">
          {yours ? (
            <img
              className={`w-24 md:w-40 transition ease-out duration-300 ${
                yours.attacking
                  ? "translate-x-[min(30rem,45vw)] scale-110 z-10"
                  : ""
              } ${yours.dino.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
              src={`/${yours.dino.variant.toLowerCase()}.gif`}
            />
          ) : (
            <img
              className="w-24 md:w-40 transition ease-out duration-300 contrast-0 brightness-[3] animate-pulse"
              src="/black.gif"
            />
          )}
          {!yours && (
            <button
              className="bg-white px-2 md:px-4 py-1 md:py-2 rounded-lg
              text-indigo-600 font-medium text-sm md:text-base
            active:bg-gray-100 active:scale-95 active:shadow-md
              md:hover:scale-95 md:hover:shadow-md
              "
              onClick={() => startQuest()}
            >
              {!!yours ? "Another quest" : "Start quest"}
            </button>
          )}
          {opponents ? (
            <img
              className={`w-24 md:w-40 transition ease-out duration-300 -scale-x-100 ${
                opponents.attacking
                  ? "-translate-x-[min(30rem,45vw)] scale-110 z-10"
                  : ""
              } ${opponents.dino.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
              src={`/${opponents.dino.variant.toLowerCase()}.gif`}
            />
          ) : (
            <img
              className="w-24 md:w-40 transition ease-out duration-300 contrast-0 brightness-[3] -scale-x-100 animate-pulse"
              src="/black.gif"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PvEPage;
