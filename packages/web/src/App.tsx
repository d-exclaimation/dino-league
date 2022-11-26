//
//  App.tsx
//  dino-league
//
//  Created by d-exclaimation on 25 Nov 2022
//

import { gql, useQuery } from "@apollo/client";
import { FC, useEffect, useState } from "react";

const App: FC = () => {
  const { loading, data, error } = useQuery(gql`
    query {
      dinosaurs(input: {}) {
        id
        name
        variant
      }
    }
  `);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCount(data?.dinosaurs?.length ?? 0);
    }
  }, [loading, data, setCount]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
        loading...
      </div>
    );
  }

  if (!!error && !data) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-800">
        {JSON.stringify(error)}
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
