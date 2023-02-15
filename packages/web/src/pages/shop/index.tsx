//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 14 Feb 2023
//

import { entries, match, removeFirst, ulid, Union } from "@dino/common";
import { FC, useMemo, useReducer, useState } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { Lib } from "../../lib";
import HomeButton from "../common/HomeButton";
import CartDialog from "./components/CartDialog";

type Item = {
  id: string;
  variant: keyof typeof Lib.items;
};
type Cart = {
  items: Item[];
};

type Act = Union<{
  add: { variant: keyof typeof Lib.items };
  remove: { variant: keyof typeof Lib.items };
  delete: { id: string };
}>;

const ShopPage: FC = () => {
  const [open, setOpen] = useState(false);
  const [{ items }, dispatch] = useReducer(
    ({ items }: Cart, action: Act) =>
      match(action, {
        // Adding a item to the cart
        add: ({ variant }) => {
          const item = { id: ulid(), variant } satisfies Item;
          return {
            items: [...items, item],
          };
        },

        // Removing a item from the cart based on its variant (always remove the first match)
        remove: ({ variant }) => ({
          items: removeFirst(items, (item) => item.variant === variant),
        }),

        // Removing a item from the cart based on its id
        delete: ({ id }) => ({
          items: removeFirst(items, (item) => item.id === id),
        }),
      }) satisfies Cart,
    {
      items: [],
    }
  );

  const totals = useMemo(
    () =>
      items.reduce((acc, { variant }) => {
        return {
          ...acc,
          [variant]: (acc[variant] ?? 0) + 1,
        };
      }, {} as { [key in keyof typeof Lib.items]: number }),
    [items]
  );

  return (
    <>
      <HomeButton />
      <CartDialog
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => console.log("TODO: Submit")}
        onRemove={(id) => dispatch({ __t: "delete", id })}
      />
      <div className="flex items-center justify-center w-screen h-screen overflow-y-auto bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2]">
        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-5 overflow-y-auto max-h-screen p-3 bg-white rounded-lg">
          {entries(Lib.items).map(([variant, { name, description, price }]) => (
            <div
              key={variant}
              className="flex items-center justify-center flex-col bg-neutral-100"
            >
              <div className="flex items-center justify-center flex-col rounded-lg p-2 w-40 h-40">
                <img className="p-2 w-20 md:w-20" src={`/${variant}.png`} />
                <span className="">{name}</span>
                <span className="text-xs text-center font-light text-black/50">
                  {description}
                </span>
              </div>
              <div className="flex mt-1 items-center justify-center text-white w-40 rounded-md">
                <button
                  className="bg-red-500 flex-1 rounded-l-md clickable"
                  onClick={() => dispatch({ __t: "remove", variant })}
                >
                  -
                </button>
                <span className="flex-1 text-black font-mono text-center">
                  {totals[variant] ?? 0}
                </span>
                <button
                  className="bg-emerald-500 flex-1 rounded-r-md clickable"
                  onClick={() => dispatch({ __t: "add", variant })}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="max-w-max fixed bottom-2 right-2 flex 
          items-center justify-center gap-1 p-2 rounded-md 
          bg-indigo-100 clickable mt-2 md:mt-0"
          onClick={() => setOpen(true)}
        >
          <img className="w-8" src="/cart.svg" />
        </button>
      </div>
    </>
  );
};

export default withAuthRedirect(ShopPage);
