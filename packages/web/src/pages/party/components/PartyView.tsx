//
//  PartyView.tsx
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import { Dino, QuickDinoInfoFragment, usePutToBoxMutation } from "@dino/apollo";
import { FC, useCallback } from "react";
import { mutationToast } from "../../../common/Toast";
import DinoListView from "./DinoListView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
};

const PartyView: FC<Props> = ({ data, shownId }) => {
  const [putToBox] = usePutToBoxMutation();

  const boxAction = useCallback(
    (id: Dino["id"]) => {
      mutationToast({
        async mutation() {
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
      });
    },
    [putToBox]
  );
  return (
    <DinoListView
      data={data}
      shownId={shownId}
      actions={{
        Box: {
          bg: "bg-indigo-400",
          text: "text-indigo-600",
          action: boxAction,
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

export default PartyView;
