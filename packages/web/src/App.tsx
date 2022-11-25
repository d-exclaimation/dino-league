//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import { FC, useState } from "react";

const App: FC = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
      <div className="flex items-center justify-center">
        <button
          className="
          w-20 h-12 rounded-l-lg text-lg font-mono
          text-white bg-teal-700
          hover:bg-teal-600
          active:bg-teal-600 active:scale-95
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
