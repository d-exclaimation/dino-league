//
//  BoxView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import {
  Dino,
  QuickDinoInfoFragment,
  useAddToPartyMutation,
} from "@dino/apollo";
import { FC, useCallback } from "react";
import { mutationToast } from "../../../common/Toast";
import DinoListView from "./DinoListView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
  canAddToParty: boolean;
};

const BoxView: FC<Props> = ({ data, shownId, canAddToParty }) => {
  const [addToParty] = useAddToPartyMutation();

  const partyAction = useCallback(
    async (id: Dino["id"]) => {
      mutationToast({
        async mutation() {
          const { data, errors } = await addToParty({
            variables: {
              dino: id,
            },
            refetchQueries: ["PartyView"],
          });

          if (!data || errors) {
            throw errors?.at(0)?.message ?? "Unexpected error";
          }

          switch (data.addDinoToParty.__typename) {
            case "Indicator":
              return "Dinosaur has been added to the party";
            case "Unauthorized":
              throw "Invalid user";
            case "InputConstraint":
              throw `${data.addDinoToParty.name} field is incorrect, ${data.addDinoToParty.reason}`;
          }
        },
      });
    },
    [addToParty]
  );
  return (
    <DinoListView
      data={data}
      shownId={shownId}
      bg="bg-slate-100"
      actions={{
        Party: {
          bg: "bg-violet-400",
          text: "text-violet-600",
          disabled: !canAddToParty,
          action: partyAction,
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
  );
};

export default BoxView;
