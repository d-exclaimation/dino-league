//
//  MinoDinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 17 Dec 2022
//

//
//  MinoDinoView.tsx
//  dino-league
//
//  Created by d-exclaimation on 17 Dec 2022
//

import type { Dino, PlaceholderPartyQuery } from "@dino/apollo";
import { Float } from "@headlessui-float/react";
import { Menu } from "@headlessui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import type { Color } from "../../common/Styling";

type Props = {
  bg: Color.Bg;
  dino: Omit<PlaceholderPartyQuery["dinosaurs"][number], "__typename">;
  actions?: {
    [name: string]: {
      bg: Color.Bg;
      text: Color.Text;
      disabled?: boolean;
      action: (id: Dino["id"]) => void;
    };
  };
};

const MinoDinoView: FC<Props> = ({
  bg,
  dino: { id, name, hp, percentage, variant },
  actions: maybeActions,
}) => {
  const actions = maybeActions ?? {};
  return (
    <Menu>
      <Float placement="bottom-end" offset={1} flip>
        <Menu.Button
          key={id}
          className="select-none outline-none cursor-pointer"
        >
          <div
            className={`
            flex items-center justify-center w-60 min-w-fit mx-3 h-40
            ${bg} rounded-2xl px-5 p-2 
            transform shadow-sm shadow-gray-400 
            active:bg-gray-100
            active:scale-95 active:shadow-md
            md:hover:scale-95 md:hover:shadow-md
            `}
          >
            <div className="flex flex-col items-center justify-start h-1/2">
              <div className="font-ligh ">{name}</div>
              <div className="flex items-center justify-center flex-col">
                <span
                  className={`text-xl font-semibold ${
                    percentage > 67
                      ? "text-emerald-600"
                      : percentage > 34
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {hp.toFixed(1)}
                </span>
                <span className="text-xs text-neutral-400">HP</span>
              </div>
            </div>
            <img
              className="w-28 select-none"
              alt="monster"
              src={`${variant ?? "white"}.gif`}
            />
          </div>
        </Menu.Button>
        <Menu.Items className="w-60 divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none h-fit">
          <div className="px-1 py-1 z-10">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/?id=${id}`}
                  className={`${
                    active
                      ? "bg-blue-500 text-white"
                      : "text-blue-500 md:text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  View
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1 z-10">
            {Object.keys(actions).map((name) => {
              const { bg, action, text, disabled } = actions[name];
              return (
                <Menu.Item key={name} disabled={disabled}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? `${bg} text-white` : `${text} md:text-gray-900`
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                        disabled
                          ? "saturate-0 md:saturate-100 md:opacity-50"
                          : ""
                      }`}
                      onClick={() => action(id)}
                      disabled={disabled}
                    >
                      {name}
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Float>
    </Menu>
  );
};

export default MinoDinoView;
