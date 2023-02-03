//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 06 Jan 2023
//

import type { FC } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import HomeButton from "../common/HomeButton";
import Tabs from "../common/Tabs";
import Custom from "./components/Custom";
import Egg from "./components/Egg";

const BarrackPage: FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2] w-screen min-h-screen h-max">
      <HomeButton />
      <div className="w-full max-w-2xl px-2 sm:px-0">
        <Tabs>
          {{
            Custom: <Custom />,
            Egg: <Egg />,
            Sales: (
              <div className="flex flex-col items-center justify-center w-full h-[70vh]">
                <img src="/egg.gif" />
                <button className="flex items-center justify-center px-3 py-2 rounded-md bg-emerald-500 text-white clickable">
                  <img className="w-8 pr-2" src="/coin.svg" /> 500
                </button>
              </div>
            ),
          }}
        </Tabs>
      </div>
    </div>
  );
};

export default withAuthRedirect(BarrackPage);
