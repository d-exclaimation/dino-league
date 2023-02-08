//
//  PartyView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import { Dino, QuickDinoInfoFragment, usePutToBoxMutation } from "@dino/apollo";
import { FC } from "react";
import { useToastableMutation } from "../../../common/Toast";
import DinoListView from "./DinoListView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
  lastDino?: boolean;
};

const PartyView: FC<Props> = ({ data, shownId, lastDino }) => {
  const [putToBox] = usePutToBoxMutation();

  const partyAction = useToastableMutation(
    {
      async mutation(id: Dino["id"]) {
        const { data, errors } = await putToBox({
          variables: {
            dino: id,
          },
          refetchQueries: ["PartyView"],
        });

        if (!data || errors) {
          throw errors?.at(0)?.message ?? "Unexpected error";
        }

        switch (data.putDinoToBox.__typename) {
          case "Indicator":
            return "Dinosaur has been boxed";
          case "Unauthorized":
            throw "Invalid user";
          case "InputConstraint":
            throw `${data.putDinoToBox.name} field is incorrect, ${data.putDinoToBox.reason}`;
        }
      },
    },
    [putToBox]
  );
  return (
    <DinoListView
      title="Party"
      data={data}
      shownId={shownId}
      lastDino={lastDino}
      actions={{
        Box: {
          bg: "bg-indigo-400",
          text: "text-indigo-600",
          action: partyAction,
        },
      }}
    />
  );
};

export default PartyView;
