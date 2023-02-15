//
//  DinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Dec 2022
//

import { usePartyViewQuery } from "@dino/apollo";
import { FC, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import HomeButton from "../common/HomeButton";
import BoxView from "./components/BoxView";
import DinoStat from "./components/DinoStat";
import PartyView from "./components/PartyView";

const PartyPage: FC = () => {
  const nav = useNavigate();
  const [searchParam] = useSearchParams();
  const id = useMemo(() => searchParam.get("id"), [searchParam]);
  const { data, error, loading } = usePartyViewQuery({
    variables: {
      dino: {
        id: id ?? "claxchxpc00017trcssa6v46b",
      },
    },
  });

  const dino = useMemo(() => data?.dinosaur, [data]);
  const hasFullParty = useMemo(() => data?.me?.hasFullParty ?? true, [data]);
  const party = useMemo(() => data?.me?.party, [data]);
  const box = useMemo(() => data?.me?.box, [data]);
  const count = useMemo(
    () => (box && party ? box.length + party.length : 0),
    [box, party]
  );

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

  useEffect(() => {
    if (id || loading) {
      return;
    }
    if (party?.at(0)?.id) {
      nav(`/party?id=${encodeURIComponent(party?.at(0)?.id ?? "")}`, {});
    }
    if (box?.at(0)?.id) {
      nav(`/party?id=${encodeURIComponent(box?.at(0)?.id ?? "")}`, {});
    }
  }, [loading, id]);

  if (error) {
    return (
      <div className="w-screen md:w-96 h-screen bg-[#C0B2A2] flex items-center justify-center">
        <div className="text-xl text-white animate-pulse">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#C0B2A2]">
      <HomeButton />
      <div className="flex items-center justify-center flex-row h-[45%]">
        <div className="flex flex-col items-end justify-center">
          <span className="text-5xl md:text-7xl text-white border-b-2 border-white my-2">
            {dino?.level.toString() ?? "..."}
          </span>
          <span className="text-white/70 text-xs md:text-base">
            {dino?.name ?? "..."}
          </span>
        </div>
        <img className="w-48 md:w-72" alt="Image" src={imageSrc} />
      </div>
      <div className="w-full h-[55%] bg-white">
        <div className="w-full bg-white h-40">
          <div className="flex flex-row h-full w-full items-center md:justify-center overflow-auto p-2">
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
          <button
            disabled
            className="p-2 my-2 mx-2 flex-grow bg-rose-400 disabled:bg-black/5 rounded-md text-white disabled:text-rose-400/50"
          >
            Sell
          </button>
        </div>
        <div className="w-full h-max pb-2 bg-gray-100">
          {(!party || party.length > 0) && (
            <PartyView data={party} shownId={id} lastDino={count <= 1} />
          )}
          {(!box || box.length > 0) && (
            <BoxView
              data={box}
              shownId={id}
              canAddToParty={!hasFullParty}
              lastDino={count <= 1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuthRedirect(PartyPage);
