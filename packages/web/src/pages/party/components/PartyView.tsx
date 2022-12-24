//
//  PartyView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import {
  Dino,
  QuickDinoInfoFragment,
  useSwitchDinoMutation,
} from "@dino/apollo";
import { FC, Fragment, useCallback } from "react";
import MinoDinoView from "./MinoDinoView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
};

const PartyView: FC<Props> = ({ data, shownId }) => {
  const [mutate] = useSwitchDinoMutation();
  const onSwitch = useCallback(
    (id: Dino["id"]) => {
      if (!shownId) return;
      mutate({
        variables: { input: { lhs: shownId, rhs: id } },
        refetchQueries: ["PartyView"],
      });
    },
    [mutate, shownId]
  );
  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">Party</span>
      <div className="flex flex-row w-full overflow-scroll p-2 min-h-[11rem]">
        {(data ?? []).map((props) => (
          <Fragment key={props.id}>
            <MinoDinoView
              bg="bg-teal-50"
              dino={props}
              actions={{
                Swap: {
                  bg: "bg-teal-400",
                  text: "text-teal-600",
                  action: onSwitch,
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
