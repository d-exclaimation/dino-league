//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

import { useInventoryPageQuery } from "@dino/apollo";
import { FC, useEffect } from "react";
import { toast } from "react-toastify";
import { Lib } from "../../lib";

const InventoryPage: FC = () => {
  const { data, loading, error } = useInventoryPageQuery();

  useEffect(() => {
    if (loading || !error) {
      return;
    }
    const id = toast(error.message, {
      type: "error",
      pauseOnHover: true,
      autoClose: 2000,
    });
    return () => {
      toast.dismiss(id);
    };
  }, [loading, error]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-scroll bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2]">
      <div
        className="w-[95%] max-w-2xl rounded-md h-10 bg-amber-900/20
        z-10 flex items-center justify-center sticky top-0 m-1"
      >
        <h3 className="font-sans font-light text-sm text-white">Inventory</h3>
      </div>
      <div className="w-[95%] max-w-2xl h-[70vh] bg-white rounded-md overflow-y-scroll">
        {data?.me?.inventory
          ?.map(({ id, variant }) => ({
            id,
            variant: variant.toString(),
            ...Lib.items[variant],
          }))
          ?.map(({ variant, name, description, id }) => (
            <button
              className="flex items-center justify-start w-full m-1 clickable bg-black/5"
              key={id}
            >
              <img className="p-2 w-10" src={`/${variant}.png`} />
              <span>{name}</span>
              <span className="px-2 text-xs text-black/50">{description}</span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default InventoryPage;
