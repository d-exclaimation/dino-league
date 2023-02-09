//
//  JoiningDino.tsx
//  dino-league
//
//  Created by d-exclaimation on 08 Jan 2023
//

import type { Palette } from "@d-exclaimation/common/tailwind";
import { JoiningDinoInfoFragment, useRenameDinoMutation } from "@dino/apollo";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Lib } from "../../lib";

type Props = {
  title: string;
  dino?: Omit<JoiningDinoInfoFragment, "__typename">;
  open: boolean;
  close: () => void;
};

const JoiningDino: FC<Props> = ({ title, dino, close, open }) => {
  const [renameDino] = useRenameDinoMutation();
  const [name, setName] = useState(dino?.name ?? "");

  const price = useMemo(() => dino?.price ?? 0, [dino]);
  const rarityColor = useMemo(
    (): Palette["ring-offset"] =>
      price > Lib.price.ultra
        ? "ring-offset-fuchsia-500"
        : price > Lib.price.epic
        ? "ring-offset-indigo-500"
        : price > Lib.price.rare
        ? "ring-offset-sky-500"
        : price > Lib.price.uncommon
        ? "ring-offset-green-500"
        : "ring-offset-slate-300",
    [price]
  );

  const onClose = useCallback(async () => {
    if (!dino || !name) return close();
    const { data, errors } = await renameDino({
      variables: {
        input: {
          id: dino?.id,
          name,
        },
      },
      refetchQueries: ["PartyView"],
    });

    if (!data || errors)
      return toast(errors?.at(0)?.message ?? "Unexpected error", {
        type: "error",
        autoClose: 2000,
        pauseOnHover: true,
        theme: "light",
      });

    const res = data.renameDino;

    switch (res.__typename) {
      case "Indicator":
        setName("");
        return close();
      case "InputConstraint":
        return toast(`Invalid input for ${res.name} due to ${res.reason}`, {
          type: "error",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
      case "Unauthorized":
        return toast("You are not authorized to make changes", {
          type: "error",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
    }
  }, [close, renameDino, setName, name]);

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
              className={`border-0 transition-all max-w-[90vw]
              transform overflow-hidden rounded-2xl 
              bg-white p-6 text-left align-middle shadow-xl 
              ring-white ring-opacity-60 ring-offset-2 
              ring-2 ${rarityColor}
              `}
            >
              <Dialog.Title as={Fragment}>
                <h2 className="text-xl font-medium leading-6 text-gray-900">
                  {title ?? "A dinosaur is joining your team"}
                </h2>
              </Dialog.Title>
              <div className="flex flex-col items-center justify-center w-full mt-2">
                <div className="flex items-center justify-around w-full">
                  <img
                    className="w-40"
                    src={`/${dino?.variant.toLowerCase() ?? "black"}.gif`}
                  />
                  <div className="flex flex-col items-start justify-center m-2">
                    <input
                      className="outline-none border-none text-neutral-400 w-min"
                      placeholder={dino?.name ?? "Name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <span className="text-3xl md:text-4xl font-semibold">
                      {dino?.level}
                    </span>
                    <span className="text-sm md:text-base text-neutral-400">
                      Level
                    </span>
                  </div>
                </div>
                <div className="flex flex-row w-full text-sm text-neutral-700">
                  <span>
                    You purchased a {dino?.variant.toString()} (lvl.
                    {dino?.level}) worth
                  </span>
                  <img className="w-3 ml-2 mr-1" src="/coin.svg" />
                  <span className="text-sm bg-gradient-to-r from-fuchsia-600 to-blue-500 bg-clip-text text-transparent">
                    {Math.round(price)}
                  </span>
                </div>
              </div>

              <div className="flex w-full items-center justify-end mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md 
                  bg-emerald-50 px-4 py-2 
                  text-sm font-medium text-emerald-700
                  clickable"
                  onClick={onClose}
                >
                  Got it, thanks!
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default JoiningDino;
