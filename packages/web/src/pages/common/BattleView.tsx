//
//  BattleView.tsx
//  dino-league
//
//  Created by d-exclaimation on 05 Jan 2023
//

import type { Palette } from "@d-exclaimation/common/tailwind";
import {
  Arena,
  BattleEnd,
  BattleInit,
  BattleTurn,
  BattlingDinoInfoFragment,
} from "@dino/apollo";
import { FC, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useManagedTimeout } from "../../common/VirtualDom";

type BattleDinoDisplay = {
  damage?: number;
  dino: BattlingDinoInfoFragment;
  remaining: number;
  attacking: boolean;
};

type Battling<T> = Omit<T, "yours" | "opponents"> & {
  yours: BattlingDinoInfoFragment;
  opponents: BattlingDinoInfoFragment;
};

type BattlePlan = BattleEnd | Battling<BattleInit> | Battling<BattleTurn>;

type Props = {
  location: Arena;
  start: () => Promise<BattlePlan[]>;
};

const dmg = ({ damage, dino }: BattleDinoDisplay): Palette["bg"] => {
  if (!damage) return "bg-transparent";
  const percentage = Math.round((damage * 100) / dino.hp);
  if (percentage < 25) return "bg-sky-400";
  if (percentage < 50) return "bg-green-400";
  if (percentage < 75) return "bg-amber-400";
  return "bg-red-400";
};

const hp = ({ dino: { percentage } }: BattleDinoDisplay): Palette["text"] => {
  if (percentage < 33) return "text-red-500";
  if (percentage < 67) return "text-amber-500";
  return "text-green-500";
};

const BattleView: FC<Props> = ({ location, start }) => {
  const { timeout } = useManagedTimeout();
  const [yours, setYours] = useState<BattleDinoDisplay | null>(null);
  const [opponents, setOpponents] = useState<BattleDinoDisplay | null>(null);

  const event = useCallback(
    (plan: BattlePlan[]) => {
      if (!plan.length) return;

      const [head, ...tail] = plan;
      switch (head.__typename) {
        case "BattleEnd":
          toast(head.win ? "🎉 Quest completed" : "🔥 Quest failed", {
            type: head.win ? "default" : "error",
            autoClose: 2000,
            pauseOnHover: true,
            theme: "light",
          });
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
          timeout({
            timeout: 500,
            action: () => event(tail),
          });
          break;
        case "BattleTurn":
          const { attacking, yours, opponents, damage } = head;

          timeout({
            timeout: 500,
            action() {
              setYours((prev) => {
                const newState = {
                  dino: yours,
                  damage: !attacking ? damage : undefined,
                  attacking,
                };
                return prev ? { ...prev, ...newState } : prev;
              });
              setOpponents((prev) => {
                const newState = {
                  dino: opponents,
                  damage: attacking ? damage : undefined,
                  attacking: !attacking,
                };
                return prev ? { ...prev, ...newState } : prev;
              });

              timeout({
                timeout: 400,
                action() {
                  setYours((prev) =>
                    prev
                      ? { ...prev, attacking: false, damage: undefined }
                      : prev
                  );
                  setOpponents((prev) =>
                    prev
                      ? { ...prev, attacking: false, damage: undefined }
                      : prev
                  );

                  event(tail);
                },
              });
            },
          });
          break;
      }
    },
    [setYours, setOpponents, timeout]
  );

  const init = useCallback(async () => {
    const plan = await start();
    timeout({
      action: () => event(plan),
    });
  }, [start, event, timeout]);

  return (
    <div
      className="flex flex-col items-center justify-center max-w-3xl h-1/2 w-[90%] bg-cover rounded-lg"
      style={{
        backgroundImage: `url('/bg/${location.toLowerCase()}.webp')`,
      }}
    >
      <div className="flex items-center justify-between px-5 py-2 w-full h-4/6">
        {yours ? (
          <div className="flex items-center justify-between flex-col h-full">
            <span
              className={`text-white p-1 text-xs md:text-base font-medium rounded-md ${dmg(
                yours
              )}`}
            >
              {yours.damage?.toFixed(2) ?? ""}
            </span>
            <img
              className={`w-24 md:w-40 transition ease-out duration-300 ${
                yours.attacking
                  ? "translate-x-[min(30rem,45vw)] scale-110 z-10"
                  : ""
              } ${yours.dino.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
              src={`/${yours.dino.variant.toLowerCase()}.gif`}
            />
            <span
              className={`bg-white py-1 px-4 md:text-lg font-medium rounded-md ${hp(
                yours
              )}`}
            >
              {yours.dino.hp.toFixed(2)}
            </span>
          </div>
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
            active:bg-gray-100 clickable
              "
            onClick={init}
          >
            {!!yours ? "Another quest" : "Start quest"}
          </button>
        )}
        {opponents ? (
          <div className="flex items-center justify-between flex-col h-full">
            <span
              className={`text-white p-1 text-xs md:text-base font-medium rounded-md ${dmg(
                opponents
              )}`}
            >
              {opponents.damage?.toFixed(2) ?? ""}
            </span>
            <img
              className={`w-24 md:w-40 transition ease-out duration-300 -scale-x-100 ${
                opponents.attacking
                  ? "-translate-x-[min(30rem,45vw)] scale-110 z-10"
                  : ""
              } ${opponents.dino.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
              src={`/${opponents.dino.variant.toLowerCase()}.gif`}
            />
            <span
              className={`bg-white py-1 px-4 md:text-lg font-medium rounded-md ${hp(
                opponents
              )}`}
            >
              {opponents.dino.hp.toFixed(2)}
            </span>
          </div>
        ) : (
          <img
            className="w-24 md:w-40 transition ease-out duration-300 contrast-0 brightness-[3] -scale-x-100 animate-pulse"
            src="/black.gif"
          />
        )}
      </div>
    </div>
  );
};

export default BattleView;
