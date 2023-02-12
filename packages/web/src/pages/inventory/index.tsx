//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

import {
  Consumable,
  Dino,
  Item,
  useInventoryPageQuery,
  useUseItemMutation,
} from "@dino/apollo";
import { FC, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Lib } from "../../lib";
import HomeButton from "../common/HomeButton";
import PartyDialog from "./components/PartyDialog";

type SelectedItem = {
  id: Item["id"];
  variant: Consumable;
};

const InventoryPage: FC = () => {
  const [useItem] = useUseItemMutation();
  const { data, loading, error } = useInventoryPageQuery();
  const [selected, setSelected] = useState<SelectedItem | undefined>(undefined);

  const useItemAction = useCallback(
    async (dino: Dino["id"]) => {
      if (!selected?.id) return;

      const { data, errors } = await useItem({
        variables: {
          input: {
            dino,
            item: selected?.id,
          },
        },
        refetchQueries: ["PartyView", "InventoryPage"],
      });

      if (!data || errors) {
        toast(errors?.at(0)?.message ?? "Unexpected error", {
          type: "error",
          autoClose: 2000,
        });
        return;
      }

      switch (data.useItem.__typename) {
        case "Indicator":
          toast("Item has been used", {
            type: "success",
            autoClose: 2000,
          });
          setSelected(undefined);
          return;
        case "Unauthorized":
          toast("You must be logged and owned the item and dino", {
            type: "error",
            autoClose: 2000,
          });
          return;
        case "InputConstraint":
          toast(`${data.useItem.name} ${data.useItem.reason}`, {
            type: "error",
            autoClose: 2000,
          });
          return;
      }
    },
    [selected?.id, useItem, setSelected]
  );
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
    <>
      <PartyDialog
        party={data?.me?.party ?? []}
        onClose={() => setSelected(undefined)}
        selected={selected}
        onSelect={useItemAction}
      />
      {/* TODO: Item effect dialog */}
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-scroll bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2]">
        <HomeButton />
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
              variant,
              ...Lib.items[variant],
            }))
            ?.map(({ variant, name, description, id }) => (
              <button
                className="flex items-center justify-start w-full m-1 clickable bg-black/5"
                key={id}
                onClick={() => setSelected({ id, variant })}
              >
                <img className="p-2 w-10" src={`/${variant.toString()}.png`} />
                <span>{name}</span>
                <span className="px-2 text-xs text-black/50">
                  {description}
                </span>
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
