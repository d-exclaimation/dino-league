//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

import { fill } from "@dino/common";
import { FC, useState } from "react";

const Items = {
  berry: {
    src: "/berry.png",
  },
  burger: {
    src: "/burger.png",
  },
  chocolate: {
    src: "/chocolate.png",
  },
  cupcake: {
    src: "/cupcake.png",
  },
  soda: {
    src: "/soda.png",
  },
  potion: {
    src: "/potion.png",
  },
  icecream: {
    src: "/icecream.png",
  },
  meal: {
    src: "/meal.png",
  },
  milk: {
    src: "/milk.png",
  },
  powder: {
    src: "/powder.png",
  },
} as const;

const InventoryPage: FC = () => {
  const [items, setItems] = useState([
    ...fill<keyof typeof Items>(10, () => "powder"),
    ...fill<keyof typeof Items>(10, () => "berry"),
    ...fill<keyof typeof Items>(10, () => "chocolate"),
    ...fill<keyof typeof Items>(10, () => "icecream"),
    ...fill<keyof typeof Items>(10, () => "potion"),
  ]);
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
          .map((item) => [item, Items[item]] as const)
          .map(([key, { src }], i) => (
            <div
              className="flex items-center justify-start m-1 clickable bg-black/5"
              key={`${key}-${i}`}
            >
              <img className="p-2 w-10" src={src} />
              <span>{key}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default InventoryPage;
