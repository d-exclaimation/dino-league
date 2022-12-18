//
//  PartyView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import { Dino, usePlaceholderPartyQuery } from "@dino/apollo";
import { FC, Fragment } from "react";
import MinoDinoView from "./MinoDinoView";

type Props = {
  shownId?: Dino["id"] | null;
};

const PartyView: FC<Props> = ({ shownId }) => {
  const { data } = usePlaceholderPartyQuery();
  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">Party</span>
      <div className="flex flex-row w-full overflow-scroll p-2">
        {(data?.dinosaurs ?? []).map((props) => (
          <Fragment key={props.id}>
            <MinoDinoView
              bg="bg-teal-50"
              dino={props}
              actions={{
                Swap: {
                  bg: "bg-teal-400",
                  text: "text-teal-600",
                  action(id) {
                    console.info(`Swapping ${id} with ${shownId}`);
                  },
                },
                Box: {
                  bg: "bg-indigo-400",
                  text: "text-indigo-600",
                  action(id) {
                    console.info(`Boxing ${id}`);
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

export default PartyView;
