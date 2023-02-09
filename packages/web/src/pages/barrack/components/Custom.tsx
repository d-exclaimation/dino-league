//
//  Custom.tsx
//  dino-league
//
//  Created by d-exclaimation on 03 Feb 2023
//

import {
  JoiningDinoInfoFragment,
  useAuth,
  useCreateDinoMutation,
  Variant,
} from "@dino/apollo";
import { Listbox, Transition } from "@headlessui/react";
import { FC, Fragment, useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Color } from "../../../common/Styling";
import { Lib } from "../../../lib";
import FormInput from "../../common/FormInput";
import JoiningDino from "../../common/JoiningDino";

const Custom: FC = () => {
  const { user } = useAuth();
  const [createDino] = useCreateDinoMutation();
  const [variant, setVariant] = useState<keyof typeof Lib.variants>("white");
  const [level, setLevel] = useState(1);
  const [open, setOpen] = useState(false);
  const [joining, setJoining] =
    useState<Omit<JoiningDinoInfoFragment, "__typename">>();

  const price = useMemo(
    () =>
      Math.round(
        Lib.price.get(Lib.variants[variant]) *
          Lib.scaling(level) *
          Lib.price.tax
      ),
    [variant, level]
  );

  const rarity = useMemo((): Color.Text => {
    if (price <= Lib.price.avg) return "text-black";
    if (price <= Lib.price.uncommon) return "text-emerald-500";
    if (price <= Lib.price.rare) return "text-blue-500";
    if (price <= Lib.price.epic) return "text-purple-500";
    return "text-fuchsia-500";
  }, [price]);

  const buy = useCallback(async () => {
    const { data, errors } = await createDino({
      variables: {
        input: {
          variant: variant as Variant,
          level: level,
        },
      },
      refetchQueries: ["PartyView", "Me"],
    });

    if (!data || errors)
      return toast(errors?.at(0)?.message ?? "Unexpected error", {
        type: "error",
        autoClose: 2000,
        pauseOnHover: true,
        theme: "light",
      });

    const res = data.createDino;
    switch (res.__typename) {
      case "NewDino":
        setJoining(res.dino);
        setOpen(true);
        break;
      case "Unauthorized":
        return toast("Cracking an egg require logging in", {
          type: "warning",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
      case "Underfunded":
        return toast("You don't have enough funds to crack an egg", {
          type: "warning",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
      case "InputConstraint":
        return toast(`Invalid input for ${res.name}, due to ${res.reason}`, {
          type: "error",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
    }
  }, [createDino, setJoining, setOpen, level, variant]);

  return (
    <>
      <JoiningDino
        title="A dinosaur is joining your team"
        close={() => setOpen(false)}
        dino={joining}
        open={open}
      />
      <div className="flex flex-col items-center justify-center w-full h-max">
        <div className="flex items-center justify-center p-4 md:p-10">
          <img className="w-1/2 max-w-sm" src={`/${variant}.gif`} />
        </div>
        <div className="px-6 py-1 w-full mx-2 bg-white/50 rounded-sm">
          <Listbox value={variant} onChange={setVariant}>
            <span className="text-[#a16207] text-[0.6rem]">Variant</span>
            <Listbox.Button className="w-full cursor-default py-2 text-left outline-none border-b-2 border-black border-opacity-20">
              <span className="block truncate text-sm my-1">{variant}</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-max overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Lib.ALL_VARIANTS.map((variance, i) => (
                  <Listbox.Option
                    key={i}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-2 pr-10 md:pr-12 ${
                        active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                      }`
                    }
                    value={variance}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {variance}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
          <FormInput
            type="number"
            label="Level"
            value={`${level}`}
            bind={(e) => {
              if (!e.target.value) return;
              setLevel(Math.min(Math.max(1, e.target.valueAsNumber), 100));
            }}
            min={1}
            max={100}
          />
          <FormInput
            type="name"
            label="HP"
            value={(Lib.variants[variant].hp * Lib.scaling(level)).toFixed(2)}
            bind={(_) => {}}
          />
          <div className="flex flex-row w-full gap-2">
            <div className="flex flex-col w-full">
              <FormInput
                type="name"
                label="Attack"
                value={(
                  Lib.variants[variant].attack * Lib.scaling(level)
                ).toFixed(2)}
                bind={(_) => {}}
              />
              <FormInput
                type="name"
                label="Healing"
                value={(
                  Lib.variants[variant].attack * Lib.scaling(level)
                ).toFixed(2)}
                bind={(_) => {}}
              />
            </div>
            <div className="flex flex-col w-full">
              <FormInput
                type="name"
                label="Speed"
                value={(
                  Lib.variants[variant].speed * Lib.scaling(level)
                ).toFixed(2)}
                bind={(_) => {}}
              />
              <FormInput
                type="name"
                label="Arena"
                value={Lib.variants[variant].arena}
                bind={(_) => {}}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <button
              disabled={price > (user?.cash ?? 0)}
              className={`flex py-2 my-2 items-center justify-center px-3 
                rounded-md ${rarity} bg-white enabled:clickable
                disabled:opacity-60
              `}
              onClick={buy}
            >
              <img className="w-8 pr-2" src="/coin.svg" /> {price}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Custom;
