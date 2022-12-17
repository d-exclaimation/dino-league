//
//  DinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Dec 2022
//

import { FC, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import MinoDinoView from "./MinoDinoView";

const DinoView: FC = () => {
  const [searchParam] = useSearchParams();

  const imageSrc = useMemo(
    () => searchParam.get("img") ?? "blue.gif",
    [searchParam]
  );

  return (
    <div className="w-screen md:w-96 h-screen bg-[#C0B2A2]">
      <div className="flex items-center justify-evenly flex-row h-[45%]">
        <div />
        <div className="flex flex-col items-start justify-center">
          <span className="text-8xl text-white border-b-2 border-white my-2">
            2
          </span>
          <span className="text-white/70">Bluey</span>
        </div>
        <img className="w-64 md:w-72" alt="Image" src={imageSrc} />
      </div>
      <div className="w-full h-[55%] bg-white">
        <div className="flex items-center justify-evenly h-40 overflow-x-scroll p-2">
          <div className="flex items-center justify-center flex-col">
            <span className="text-3xl font-semibold">99</span>
            <span className="text-neutral-400">HP</span>
          </div>
          <span className="border-r-2 border-r-neutral-500/10 h-[50%] m-2" />
          <div className="flex items-center justify-center flex-col">
            <span className="text-3xl font-semibold">40</span>
            <span className="text-neutral-400">Attack</span>
          </div>
          <span className="border-r-2 border-r-neutral-500/10 h-[50%] m-2" />
          <div className="flex items-center justify-center flex-col">
            <span className="text-2xl font-semibold">Grassland</span>
            <span className="text-neutral-400">Arena</span>
          </div>
        </div>
        <div className="w-full h-[70%] bg-gray-100">
          <div className="flex flex-row w-full overflow-scroll h-full p-2">
            <MinoDinoView variant="blue" />
            <MinoDinoView variant="green" />
            <MinoDinoView variant="red" />
            <MinoDinoView variant="pink" />
            <MinoDinoView variant="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoView;
