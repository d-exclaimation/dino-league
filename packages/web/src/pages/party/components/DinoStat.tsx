//
//  DinoStat.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import type { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  rating?: "bad" | "mid" | "good";
};

const ratingToColor = (rating?: "bad" | "mid" | "good") => {
  if (!rating) return "text-black";
  switch (rating) {
    case "bad":
      return "text-red-600";
    case "mid":
      return "text-amber-600";
    case "good":
      return "text-emerald-600";
  }
};

const DinoStat: FC<Props> = ({ title, children, rating }) => {
  return (
    <div className="flex items-center justify-center w-60 min-w-fit mx-3 h-30 bg-white px-5 p-2">
      <div className="flex flex-col items-center justify-start h-1/2">
        <div className="flex items-center justify-center flex-col">
          <span className={`text-3xl font-semibold ${ratingToColor(rating)}`}>
            {children}
          </span>
          <span className="text-neutral-400">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default DinoStat;
