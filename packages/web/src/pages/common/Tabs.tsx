//
//  Tabs.tsx
//  dino-league
//
//  Created by d-exclaimation on 07 Jan 2023
//

import { Tab } from "@headlessui/react";
import { FC, ReactNode, useMemo } from "react";

type Props = {
  children: {
    [name: string]: ReactNode;
  };
};

const Tabs: FC<Props> = ({ children }) => {
  const keys = useMemo(() => Object.keys(children), [children]);
  const panels = useMemo(
    () => keys.map((key) => ({ key: key, panel: children[key] })),
    [keys]
  );
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-amber-900/20 p-1">
        {keys.map((key) => (
          <Tab
            key={key}
            className={({ selected }) => `w-full rounded-lg py-2.5 text-sm 
            font-medium leading-5 text-amber-700
            ring-white ring-opacity-60 ring-offset-2 
            ring-offset-amber-300 focus:outline-none focus:ring-2 ${
              selected
                ? "bg-white shadow"
                : "text-amber-50 hover:bg-white/[0.12] hover:text-white"
            }`}
          >
            {key}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2">
        {panels.map(({ key, panel }) => (
          <Tab.Panel
            key={key}
            className="rounded-xl bg-white/40 p-3
          ring-white ring-opacity-60 ring-offset-2 
          ring-offset-amber-300/50 ring-2
            shadow-lg backdrop-blur-lg"
          >
            {panel}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
