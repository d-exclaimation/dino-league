//
//  LoadingBar.tsx
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { Variant } from "@dino/apollo";
import { randomElement } from "@dino/common";
import { Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";

const ALL_VARIANTS = [Variant.Black, Variant.Green, Variant.Blue];

type Props = {
  text?: string;
};

const LoadingBar: FC<Props> = ({ text }) => {
  const [isShowing, setShowing] = useState(true);
  const [variant, setVariant] = useState<Variant>(Variant.Black);

  useEffect(() => {
    if (isShowing) {
      setVariant(randomElement(ALL_VARIANTS));
    }
  }, [isShowing, setVariant]);

  useEffect(() => {
    const interval = setInterval(() => setShowing((prev) => !prev), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Transition appear show={isShowing}>
      <div className="flex flex-col items-center justify-center h-20">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in duration-700 transform"
          enterFrom="-translate-x-[min(10rem,20vw)]"
          enterTo="translate-x-0"
          leave="transition ease-in duration-700 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-[min(10rem,20vw)]"
        >
          <img className="w-20" src={`/sm/${variant.toString()}.webp`} />
        </Transition.Child>
        {text && (
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="font-mono text-gray-50 md:text-gray-700 text-sm md:text-base">
              {text}
            </div>
          </Transition.Child>
        )}
      </div>
    </Transition>
  );
};

export default LoadingBar;
