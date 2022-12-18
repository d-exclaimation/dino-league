//
//  DinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Dec 2022
//

import { useDinosaurQuery } from "@dino/apollo";
import { FC, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BoxView from "./BoxView";
import DinoStat from "./DinoStat";
import PartyView from "./PartyView";

const DinoView: FC = () => {
  const nav = useNavigate();
  const [searchParam] = useSearchParams();
  const id = useMemo(() => searchParam.get("id"), [searchParam]);
  const { data, error } = useDinosaurQuery({
    variables: {
      input: {
        id: id ?? "claxchxpc00017trcssa6v46b",
      },
    },
  });

  const dino = useMemo(() => data?.dinosaur, [data]);

  const health = useMemo(() => {
    if (!dino) return undefined;
    if (dino.percentage > 67) {
      return "good";
    }
    if (dino.percentage > 34) {
      return "mid";
    }
    return "bad";
  }, [dino]);

  const imageSrc = useMemo(() => {
    const variant = data?.dinosaur?.variant;
    if (!variant) return "white.gif";
    return `${variant.toLowerCase()}.gif`;
  }, [data]);

  if (!id) {
    // TODO: Redirect somewhere
    nav("/404");
  }

  if (error) {
    return (
      <div className="w-screen md:w-96 h-screen bg-[#C0B2A2] flex items-center justify-center">
        <div className="text-xl text-white animate-pulse">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#C0B2A2]">
      <div className="flex items-center justify-evenly flex-row h-[45%]">
        <div />
        <div className="flex flex-col items-start justify-center">
          <span className="text-7xl text-white border-b-2 border-white my-2">
            {dino?.level.toString() ?? "..."}
          </span>
          <span className="text-white/70">{dino?.name ?? "..."}</span>
        </div>
        <img className="w-64 md:w-72" alt="Image" src={imageSrc} />
      </div>
      <div className="w-full h-[55%] bg-white">
        <div className="w-full bg-white h-40">
          <div className="flex flex-row h-full w-full items-center md:justify-center overflow-scroll p-2">
            <DinoStat title="HP" rating={health}>
              {dino?.hp?.toFixed(1) ?? "..."}
            </DinoStat>
            <div className="border-r-2 border-r-neutral-500/10 h-[50%] w-0 m-2" />
            <DinoStat title="Attack">
              {dino?.attack?.toFixed(1) ?? "..."}
            </DinoStat>
            <div className="border-r-2 border-r-neutral-500/10 h-[50%] w-0 m-2" />
            <DinoStat title="Speed">{dino?.speed?.toFixed(1) ?? "0"}</DinoStat>
            <div className="border-r-2 border-r-neutral-500/10 h-[50%] w-0 m-2" />
            <DinoStat title="Healing">
              {dino?.healing?.toFixed(1) ?? "..."}
            </DinoStat>
            <div className="border-r-2 border-r-neutral-500/10 h-[50%] w-0 m-2" />
            <DinoStat title="Arena">
              {dino?.arena?.toLowerCase() ?? "..."}
            </DinoStat>
          </div>
        </div>
        <div className="flex flex-row w-full items-center gap-2 md:gap-6 bg-white">
          <button className="p-2 my-2 mx-2 flex-grow bg-cyan-400 rounded-md text-white">
            Item
          </button>
          <button className="p-2 my-2 mx-2 flex-grow bg-rose-400 rounded-md text-white">
            Sell
          </button>
        </div>
        <div className="w-full h-max pb-2 bg-gray-100">
          <PartyView shownId={id} />
          <BoxView />
        </div>
      </div>
    </div>
  );
};

export default DinoView;
