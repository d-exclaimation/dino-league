//
//  DinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Dec 2022
//

import { fill } from "@dino/common";
import type { FC } from "react";

const DinoView: FC = () => {
  return (
    <div className="w-screen h-screen bg-[#C0B2A2]">
      <div className="flex items-center justify-end flex-row h-[45%]">
        <div className="flex flex-col items-start justify-center">
          <span className="text-8xl text-white border-b-2 border-white my-2">
            2
          </span>
          <span className="text-white/70">Bluey</span>
        </div>
        <img className="w-64 md:w-72" alt="Image" src="blue.gif" />
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
            {fill(4, () => (
              <div className="w-52 h-20 px-60 outline">100</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DinoView;
