//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { FC, useRef, useState } from "react";

const PvEPage: FC = () => {
  const timeoutRef = useRef<number | null>(null);
  const [leftAttacking, setLeftAttacking] = useState(false);
  const [rightAttacking, setRightAttacking] = useState(false);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#C0B2A2]">
      <div className="flex flex-col items-center justify-center max-w-3xl h-1/2 w-[90%] bg-white rounded-lg shadow-2xl">
        <div
          className={`flex items-center justify-between px-5 py-2 w-full h-4/6`}
        >
          <img
            className={`w-24 md:w-40 transition ease-out duration-300 ${
              leftAttacking ? "translate-x-[min(30rem,45vw)]" : ""
            }`}
            src="/white.gif"
            onClick={() => {
              setLeftAttacking(true);
              setTimeout(() => setLeftAttacking(false), 400);
            }}
          />
          <img
            className={`w-24 md:w-40 -scale-x-100 transition ease-out duration-300 ${
              rightAttacking ? "-translate-x-[min(30rem,45vw)]" : ""
            }`}
            src="/black.gif"
            onClick={() => {
              setRightAttacking(true);
              setTimeout(() => setRightAttacking(false), 400);
            }}
          />
        </div>
        <div className="flex items-end p-2 md:px-3 justify-start h-1/3 w-full bg-neutral-600 text-orange-300 font-mono font-thin text-xs md:text-sm rounded-b-lg">
          Quest started
        </div>
      </div>
    </div>
  );
};

export default PvEPage;
