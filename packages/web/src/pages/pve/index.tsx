//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { match, Union } from "@d-exclaimation/union";
import { BattlingDinoInfoFragment, useQuestMutation } from "@dino/apollo";
import { FC, ReactNode, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Color } from "../../common/Styling";

type Displaying = Union<{
  loading: {};
  battling: {
    yours: BattlingDinoInfoFragment;
    opponents: BattlingDinoInfoFragment;
  };
}>;

type Plan =
  | { __typename: "BattleEnd"; win: boolean }
  | {
      __typename: "BattleInit";
      count: number;
      yours: BattlingDinoInfoFragment;
      opponents: BattlingDinoInfoFragment;
    }
  | {
      __typename: "BattleTurn";
      attacking: boolean;
      damage: number;
      yours: BattlingDinoInfoFragment;
      opponents: BattlingDinoInfoFragment;
    };

const PvEPage: FC = () => {
  const nav = useNavigate();
  const [quest] = useQuestMutation();
  const timeoutRef = useRef<number | null>(null);
  const [display, setDisplay] = useState<Displaying>({ __type: "loading" });
  const [logs, setLogs] = useState<[string, Date, Color.Text][]>([]);
  const [leftAttacking, setLeftAttacking] = useState(false);
  const [rightAttacking, setRightAttacking] = useState(false);

  const applyEvent = useCallback(
    (plan: Plan[]) => {
      if (!plan.length) {
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const [head, ...tail] = plan;
      switch (head.__typename) {
        case "BattleEnd":
          setLogs((prev) => [
            ...prev,
            [
              `Quest ended with a ${head.win ? "victory" : "defeat"}`,
              new Date(),
              head.win ? "text-emerald-200" : "text-red-200",
            ],
          ]);
          return;
        case "BattleInit":
          setLogs((prev) => [
            ...prev,
            ["Quest started", new Date(), "text-indigo-300"],
          ]);
          setDisplay({
            __type: "battling",
            yours: head.yours,
            opponents: head.opponents,
          });
          timeoutRef.current = setTimeout(() => applyEvent(tail), 500);
          break;
        case "BattleTurn":
          const { attacking, damage, yours, opponents } = head;
          const setAttacking = attacking ? setLeftAttacking : setRightAttacking;

          setLogs((prev) => [
            ...prev,
            [
              `"${yours.name}" ${attacking ? "attacked" : "was attacked by"} "${
                opponents.name
              }" dealing ${damage.toFixed(2)} (${yours.hp.toFixed(
                2
              )} vs ${opponents.hp.toFixed(2)})`,
              new Date(),
              attacking ? "text-blue-200" : "text-orange-200",
            ],
          ]);

          timeoutRef.current = setTimeout(() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            setAttacking(true);
            setDisplay({
              __type: "battling",
              yours,
              opponents,
            });

            timeoutRef.current = setTimeout(() => {
              setAttacking(false);
              applyEvent(tail);
            }, 400);
          }, 500);
          break;
      }
    },
    [setDisplay, setLeftAttacking, setRightAttacking, setLogs]
  );

  const startQuest = useCallback(async () => {
    const { data, errors } = await quest();
    if (!data || errors) {
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    switch (data.quest.__typename) {
      case "Unauthorized":
        return;
      case "Battle":
        const plan = data.quest.plan;
        timeoutRef.current = setTimeout(() => applyEvent(plan), 0);
    }
  }, [quest, applyEvent]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#C0B2A2]">
      <button className="fixed top-2 right-2" onClick={() => nav("/")}>
        <img className="w-10 md:w-12" src="/back.svg" />
      </button>
      <div className="flex flex-col items-center justify-center max-w-3xl h-1/2 w-[90%] bg-white/10 rounded-lg shadow-2xl">
        <div className="flex items-center justify-between px-5 py-2 w-full h-4/6">
          {match<Displaying, ReactNode>(display, {
            loading: () => (
              <div className="flex items-center justify-center w-full h-full">
                <button
                  className="bg-white px-4 py-2 rounded-lg  text-emerald-600 font-medium
                  active:bg-gray-100
                  active:scale-95 active:shadow-md
                  md:hover:scale-95 md:hover:shadow-md"
                  onClick={() => startQuest()}
                >
                  Start battle
                </button>
              </div>
            ),
            battling: ({ yours, opponents }) => (
              <>
                <img
                  className={`w-24 md:w-40 transition ease-out duration-300 ${
                    leftAttacking ? "translate-x-[min(30rem,45vw)]" : ""
                  } ${yours.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
                  src={`/${yours.variant.toLowerCase()}.gif`}
                />
                <img
                  className={`w-24 md:w-40 -scale-x-100 transition ease-out duration-300 ${
                    rightAttacking ? "-translate-x-[min(30rem,45vw)]" : ""
                  } ${opponents.hp <= 0 ? "contrast-50 brightness-[3]" : ""}`}
                  src={`/${opponents.variant.toLowerCase()}.gif`}
                />
              </>
            ),
          })}
        </div>
        <div className="flex flex-col items-start p-2 md:px-3 justify-end h-1/3 w-full bg-neutral-600 text-neutral-300 font-mono font-thin text-xs md:text-sm rounded-b-lg overflow-scroll gap-1">
          {logs.map(([log, date, color], i) => (
            <div
              className="flex flex-row w-full items-start justify-between"
              key={`${i}`}
            >
              <div className={"px-1 rounded-md " + color}>{log}</div>
              <div className="px-1">
                {date.getHours()}:{date.getMinutes() < 10 ? "0" : ""}
                {date.getMinutes()}:{date.getSeconds() < 10 ? "0" : ""}
                {(date.getSeconds() + date.getMilliseconds() / 1000).toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PvEPage;
