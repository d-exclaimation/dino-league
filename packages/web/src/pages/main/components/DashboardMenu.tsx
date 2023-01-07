//
//  DashboardMenu.tsx
//  dino-league
//
//  Created by d-exclaimation on 01 Jan 2023
//

import type { FC } from "react";

type Props = {
  icon: string;
  title: string;
  subtitle: string;
  action: () => void;
};

const DashboardMenu: FC<Props> = ({ title, subtitle, icon, action }) => {
  return (
    <button
      className="
      flex items-center justify-center md:justify-start h-60 md:h-80
      flex-col md:flex-row
      rounded-xl p-6 bg-white
      active:bg-gray-100 clickable
      "
      onClick={action}
    >
      <img className="w-20 md:w-40 my-2 md:ml-2 md:mr-6" src={icon} />
      <div className="flex flex-col items-center md:items-start justify-center">
        <span className="font-bold font-mono md:text-xl">{title}</span>
        <span className="font-mono font-extralight text-neutral-500 text-xs md:text-base text-center">
          {subtitle}
        </span>
      </div>
    </button>
  );
};

export default DashboardMenu;
