//
//  MinoDinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 17 Dec 2022
//

//
//  MinoDinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 17 Dec 2022
//

import type { FC } from "react";

type Props = {
  variant?:
    | "black"
    | "blue"
    | "green"
    | "pink"
    | "red"
    | "slate"
    | "white"
    | "yellow";
};

/**
 * TODO:
 *  - Take an actual dino
 */
const MinoDinoView: FC<Props> = ({ variant }) => {
  return (
    <div className="flex items-center justify-center w-60 min-w-fit mx-3 h-40 bg-white rounded-2xl px-5 p-2">
      <div className="flex flex-col items-center justify-start h-1/2">
        <span className="font-light">Bluey {/* TODO: Name */}</span>
        <div className="flex items-center justify-center flex-col">
          <span className="text-xl font-semibold">
            99 {/* TODO: HP and color */}
          </span>
          <span className="text-xs text-neutral-400">HP</span>
        </div>
      </div>
      <img className="w-28" alt="monster" src={`${variant ?? "white"}.gif`} />
    </div>
  );
};

export default MinoDinoView;
