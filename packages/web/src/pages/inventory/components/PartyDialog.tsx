//
//  PartyDialog.tsx
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Consumable, Dino, DinoUseItemInfoFragment, Item } from "@dino/apollo";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useMemo } from "react";
import MiniDinoView from "./MiniDinoView";

type Props = {
  party: DinoUseItemInfoFragment[];
  selected?: {
    id: Item["id"];
    variant: Consumable;
  };
  onClose: () => void;
  onSelect: (id: Dino["id"]) => Promise<void>;
};

const PartyDialog: FC<Props> = ({ party, selected, onClose, onSelect }) => {
  const stat = useMemo(() => {
    if (!selected) return "hp";
    switch (selected.variant) {
      case Consumable.Burger:
        return "healing";
      case Consumable.Chocolate:
        return "attack";
      case Consumable.Cupcake:
        return "healing";
      case Consumable.Icecream:
        return "level";
      case Consumable.Soda:
        return "speed";
      default:
        return "hp";
    }
  }, [selected?.variant]);
  return (
    <Transition.Root show={!!selected} as={Fragment} afterLeave={onClose}>
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
              className="border-0 transition-all max-w-[90vw]
              transform overflow-hidden rounded-2xl 
              bg-white p-6 text-left align-middle shadow-xl"
            >
              <Dialog.Title as={Fragment}>
                <h2 className="text-xl font-medium leading-6 text-gray-900">
                  Select a party member
                </h2>
              </Dialog.Title>
              <div className="flex flex-col items-center justify-center w-full mt-2">
                <div className="flex flex-row w-full overflow-scroll py-2 md:w-auto md:grid md:grid-cols-3 gap-1">
                  {party.map((dino) => (
                    <Fragment key={dino.id}>
                      <MiniDinoView
                        dino={dino}
                        stat={stat}
                        onClick={() => onSelect(dino.id)}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PartyDialog;
