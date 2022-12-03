//
//  DinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Dec 2022
//

import { FC } from "react";

const DinoView: FC = () => {
  return (
    <div className="card bg-[#15263F] w-[32rem] h-[40rem] rounded-xl p-6 space-y-4">
      <img className="max-w-full" alt="Image" />
      <div className="space-y-4">
        <h2 className="text-white font-semibold text-xl transition">
          Name <span className="hover:text-cyan-400">#Level</span>
        </h2>
        <p className="text-slate-500 text-sm select-none">
          Our Equilibrium collection promotes balance and calm.
        </p>
        <div className="flex items-center justify-between font-semibold text-sm border-b border-slate-500 pb-6">
          <span
            id="price"
            className="text-cyan-300 flex justify-between items-center"
          >
            {/* Icon here */}
            HP/MaxHp
          </span>
          <span className="text-slate-500 flex justify-between items-center select-none">
            {/* Some SVG icon here */}Some stat 1
          </span>
          <span className="text-slate-500 flex justify-between items-center select-none">
            {/* Some SVG icon here */}Some stat 2
          </span>
        </div>
      </div>
    </div>
  );
};

export default DinoView;
