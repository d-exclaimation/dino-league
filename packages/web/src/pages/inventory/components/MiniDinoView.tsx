//
//  MiniDinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Variant } from "@dino/apollo";
import { capitalized } from "@dino/common";
import { FC } from "react";

type Props = {
  dino: {
    id: string;
    hp: number;
    level: number;
    attack: number;
    healing: number;
    speed: number;
    variant: Variant;
    name: string;
    percentage: number;
  };
  stat: "hp" | "attack" | "healing" | "level" | "speed";
  onClick: () => void | Promise<void>;
};

const MiniDinoView: FC<Props> = ({
  dino: { name, percentage, variant, id, ...rest },
  stat,
  onClick,
}) => {
  const property = rest[stat];
  return (
    <button
      className="flex items-center justify-center w-60 min-w-fit mx-3 h-40
      bg-white rounded-2xl px-5 p-2 clickable"
      key={id}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-start h-1/2">
        <div className="font-ligh ">{name}</div>
        <div className="flex items-center justify-center flex-col">
          <span
            className={`text-xl font-semibold ${
              stat !== "hp"
                ? "text-blue-600"
                : percentage > 67
                ? "text-emerald-600"
                : percentage > 34
                ? "text-amber-600"
                : "text-red-600"
            }`}
          >
            {stat === "level" ? property : property.toFixed(2)}
          </span>
          <span className="text-xs text-neutral-400">
            {stat === "hp" ? "HP" : capitalized(stat)}
          </span>
        </div>
      </div>
      <img
        className="w-28 select-none"
        alt="monster"
        src={`${variant ?? "white"}.gif`}
      />
    </button>
  );
};

export default MiniDinoView;
