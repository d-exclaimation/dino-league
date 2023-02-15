//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 15 Feb 2023
//

import type { FC } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import HomeButton from "../common/HomeButton";

const PvPPage: FC = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen background">
      <HomeButton />
      <div className="bg-white/70 rounded-md px-4 py-3 text-sm md:text-base font-mono">
        PvP are not available at the moment, come back later
      </div>
    </div>
  );
};

export default withAuthRedirect(PvPPage);
