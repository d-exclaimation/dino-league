//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import { useDinosaursQuery } from "@dino/apollo";
import { FC, useState } from "react";

const App: FC = () => {
  const { data, error, loading } = useDinosaursQuery({});
  const [count, setCount] = useState(data?.dinosaurs.length ?? 0);

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
        <text className="text-white text-md font-mono">Loading...</text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
        <text className="text-white text-md font-mono">{error.message}</text>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
      <div className="flex items-center justify-center">
        <button
          className="
          w-20 h-12 rounded-l-lg text-lg font-mono
          text-white bg-teal-700
          hover:bg-teal-600
          active:bg-teal-600 active:scale-95
          active:text-opacity-90
        "
          onClick={() => setCount((count) => count + 1)}
        >
          +
        </button>
        <button
          className="
          w-28 h-12 font-mono
          text-white bg-slate-700
         "
          disabled
        >
          {count}
        </button>
        <button
          className="
          w-20 h-12 rounded-r-lg text-lg font-mono
          text-white bg-rose-700
          hover:bg-rose-600
          active:bg-rose-600 active:scale-95
        "
          onClick={() => setCount((count) => count - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default App;
