//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

import { FC, useState } from "react";
import { Lib } from "../../lib";

const InventoryPage: FC = () => {
  const [items, setItems] = useState<(keyof typeof Lib.items)[]>(["potion"]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-scroll bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2]">
      <div
        className="w-[95%] max-w-2xl rounded-md h-10 bg-amber-900/20
        z-10 flex items-center justify-center sticky top-0 m-1"
      >
        <h3 className="font-sans font-light text-sm text-white">Inventory</h3>
      </div>
      <div className="w-[95%] max-w-2xl h-[70vh] bg-white rounded-md overflow-y-scroll">
        {items
          .map((item) => ({ item, ...Lib.items[item] }))
          .map(({ item, name, description }, i) => (
            <div
              className="flex items-center justify-start m-1 clickable bg-black/5"
              key={`${item}-${i}`}
            >
              <img className="p-2 w-10" src={`/${item}.png`} />
              <span>{name}</span>
              <span className="px-2 text-xs text-black/50">{description}</span>
            </div>
          ))}
      </div>

      <div
        className="w-[95%] max-w-2xl rounded-md h-10 bg-amber-900/20
        z-10 flex items-center justify-around sticky top-0 m-1"
      >
        <button
          className="flex items-center justify-center p-2 px-4 rounded-md bg-white clickable text-xs"
          onClick={() => setItems((prev) => [...prev, "berry"])}
        >
          <img className="w-5 pr-2" src="/berry.png" /> Berry +1
        </button>
        <button
          className="flex items-center justify-center p-2 px-4 rounded-md bg-white clickable text-xs"
          onClick={() => setItems((prev) => [...prev, "potion"])}
        >
          <img className="w-5 pr-2" src="/potion.png" />
          Potion +1
        </button>
        <button
          className="flex items-center justify-center p-2 px-4 rounded-md bg-white clickable text-xs"
          onClick={() => setItems((prev) => [...prev, "powder"])}
        >
          <img className="w-5 pr-2" src="/powder.png" />
          Powder +1
        </button>
        <button
          className="flex items-center justify-center p-2 px-4 rounded-md bg-white clickable text-xs"
          onClick={() => setItems((prev) => [...prev, "chocolate"])}
        >
          <img className="w-5 pr-2" src="/chocolate.png" /> Chocolate +1
        </button>
        <button
          className="flex items-center justify-center p-2 px-4 rounded-md bg-white clickable text-xs"
          onClick={() => setItems((prev) => [...prev, "icecream"])}
        >
          <img className="w-5 pr-2" src="/icecream.png" /> Ice cream +1
        </button>
      </div>
    </div>
  );
};

export default InventoryPage;
