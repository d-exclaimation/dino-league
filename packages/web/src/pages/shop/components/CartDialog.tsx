//
//  CartDialog.tsx
//  dino-league
//
//  Created by d-exclaimation on 14 Feb 2023
//

import { capitalized, sum } from "@dino/common";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useMemo } from "react";
import { Lib } from "../../../lib";

type Item = {
  id: string;
  variant: keyof typeof Lib.items;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void> | void;
  onRemove: (id: string) => void;
  items: Item[];
};

const CartDialog: FC<Props> = ({
  open,
  onClose,
  items,
  onRemove,
  onSubmit,
}) => {
  const cost = useMemo(
    () => sum(items.map(({ variant }) => Lib.items[variant].price)),
    [items]
  );
  return (
    <Transition.Root show={open} as={Fragment} afterLeave={onClose}>
      <Dialog
        className="fixed inset-0 p-4 pt-[30vh] overflow-y-auto z-10"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm md:bg-neutral-200/70" />
        </Transition.Child>
        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            enter="duration-300 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className="border-0 transition-all max-w-lg w-[90vw]
              transform overflow-auto max-h-[90vh] rounded-2xl 
              bg-white p-6 text-left align-middle shadow-xl"
            >
              <Dialog.Title as={Fragment}>
                <h2 className="text-xl font-medium leading-6 text-gray-900">
                  Your cart
                </h2>
              </Dialog.Title>
              <div className="flex flex-col items-center justify-center w-full mt-2">
                <div className="flex flex-col w-full overflow-auto py-2 divide-y-2">
                  {items.length === 0 ? (
                    <span className="font-light">
                      There's no item in your cart
                    </span>
                  ) : (
                    items.map(({ id, variant }) => (
                      <div
                        className="flex items-center justify-between px-2 w-full bg-black/5"
                        key={id}
                      >
                        <div className="flex items-center justify-start">
                          <img
                            className="p-2 w-10"
                            src={`/${variant.toString()}.png`}
                          />
                          <span>{capitalized(variant)}</span>
                        </div>
                        <button
                          className="inline-flex justify-center rounded-md
                        px-2 py-1 text-xs bg-red-200
                        font-medium clickable"
                          onClick={() => onRemove(id)}
                        >
                          <img src="/delete.svg" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <div className="flex w-full items-center justify-end mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md 
                   bg-emerald-50 px-4 py-2 items-center
                    text-sm font-medium text-emerald-700
                    clickable"
                    onClick={onSubmit}
                  >
                    <img src="/coin.svg" className="w-4 mr-2" />
                    {cost}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartDialog;
