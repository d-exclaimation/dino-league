//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 06 Jan 2023
//

import { Tab } from "@headlessui/react";
import type { FC } from "react";

const BarrackPage: FC = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-t from-[#d0cbc5] to-[#C0B2A2] w-screen h-screen">
      <div className="w-full max-w-2xl px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) => `w-full rounded-lg py-2.5 text-sm 
            font-medium leading-5 text-stone-700
            ring-white ring-opacity-60 ring-offset-2 
            ${
              selected
                ? "bg-white shadow"
                : "text-stone-100 hover:bg-white/[0.12] hover:text-white"
            }
            ring-offset-stone-400 focus:outline-none focus:ring-2`}
            >
              Tab 1
            </Tab>
            <Tab
              className={({ selected }) => `w-full rounded-lg py-2.5 text-sm 
              font-medium leading-5 text-stone-700
              ring-white ring-opacity-60 ring-offset-2 
              ${
                selected
                  ? "bg-white shadow"
                  : "text-stone-100 hover:bg-white/[0.12] hover:text-white"
              }
              ring-offset-stone-400 focus:outline-none focus:ring-2`}
            >
              Tab 2
            </Tab>
            <Tab
              className={({ selected }) => `w-full rounded-lg py-2.5 text-sm 
              font-medium leading-5 text-stone-700
              ring-white ring-opacity-60 ring-offset-2 
              ${
                selected
                  ? "bg-white shadow"
                  : "text-stone-100 hover:bg-white/[0.12] hover:text-white"
              }
              ring-offset-stone-400 focus:outline-none focus:ring-2`}
            >
              Tab 3
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className="rounded-xl bg-white p-3
              ring-white ring-opacity-60 ring-offset-2 
              ring-offset-stone-400 focus:outline-none focus:ring-2"
            >
              Content 1
            </Tab.Panel>
            <Tab.Panel
              className="rounded-xl bg-white p-3
              ring-white ring-opacity-60 ring-offset-2 
              ring-offset-stone-400 focus:outline-none focus:ring-2"
            >
              Content 2
            </Tab.Panel>
            <Tab.Panel
              className="rounded-xl bg-white p-3
              ring-white ring-opacity-60 ring-offset-2 
              ring-offset-stone-400 focus:outline-none focus:ring-2"
            >
              Content 3
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default BarrackPage;
