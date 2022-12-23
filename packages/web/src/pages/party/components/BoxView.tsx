//
//  BoxView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import { Dino, QuickDinoInfoFragment } from "@dino/apollo";
import { FC, Fragment } from "react";
import MinoDinoView from "./MinoDinoView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
};

const BoxView: FC<Props> = ({ data, shownId }) => {
  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">Box</span>
      <div className="flex flex-row w-full overflow-scroll p-2">
        {(data ?? []).map((props) => (
          <Fragment key={props.id}>
            <MinoDinoView
              bg="bg-white"
              dino={props}
              actions={{
                Party: {
                  bg: "bg-teal-400",
                  text: "text-teal-600",
                  disabled: true,
                  action(id) {
                    console.info(
                      `Putting ${id} into next available spot in party`
                    );
                  },
                },
                Swap: {
                  bg: "bg-indigo-400",
                  text: "text-indigo-600",
                  action(id) {
                    console.info(`Swapping ${id} with ${shownId}`);
                  },
                },
                Sell: {
                  bg: "bg-red-400",
                  text: "text-red-600",
                  action(id) {
                    console.info(`Selling ${id}`);
                  },
                },
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoxView;
