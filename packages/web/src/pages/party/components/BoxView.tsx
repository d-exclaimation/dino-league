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
import { FC } from "react";
import { useToastableMutation } from "../../../common/Toast";
import DinoListView from "./DinoListView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
  canAddToParty: boolean;
  lastDino?: boolean;
};

const BoxView: FC<Props> = ({ data, shownId, canAddToParty, lastDino }) => {
  const [addToParty] = useAddToPartyMutation();

  const partyAction = useToastableMutation(
    {
      async mutation(id: Dino["id"]) {
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
    },
    [addToParty]
  );
  return (
    <DinoListView
      title="Box"
      data={data}
      shownId={shownId}
      bg="bg-slate-100"
      lastDino={lastDino}
      actions={{
        Party: {
          bg: "bg-violet-400",
          text: "text-violet-600",
          disabled: !canAddToParty,
          action: partyAction,
        },
      }}
    />
  );
};

export default BoxView;
