//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 14 Feb 2023
//

import { match, ulid, Union } from "@dino/common";
import { FC, useReducer, useState } from "react";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { Lib } from "../../lib";
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

export function cart({ items }: Cart, action: Act): Cart {
  return match(action, {
    add: ({ variant }) => {
      const item = { id: ulid(), variant } satisfies Item;
      return {
        items: [...items, item],
      };
    },
    remove: ({ variant }) => {
      const removed = items.find((item) => item.variant === variant)?.id;
      return {
        items: items.filter(({ id }) => id !== removed),
      };
    },
    delete: ({ id }) => {
      return { items: items.filter((item) => item.id !== id) };
    },
  });
}

const ShopPage: FC = () => {
  const [open, setOpen] = useState(true);
  const [{ items }, dispatch] = useReducer(cart, {
    items: [
      { id: ulid(), variant: "potion" },
      { id: ulid(), variant: "potion" },
      { id: ulid(), variant: "chocolate" },
    ],
  });
  return (
    <div className="flex items-center justify-center w-screen h-screen overflow-scroll bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2]">
      <CartDialog
        items={items}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={() => console.log("TODO: Submit")}
        onRemove={(id) => dispatch({ __t: "delete", id })}
      />
      <div className="bg-white w-10 h-10">shop</div>
    </div>
  );
};

export default withAuthRedirect(ShopPage);
