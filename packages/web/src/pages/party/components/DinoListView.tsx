//
//  DinoListView.tsx
//  dino-league
//
//  Created by d-exclaimation on 27 Dec 2022
//

import {
  Dino,
  QuickDinoInfoFragment,
  useSwitchDinoMutation,
} from "@dino/apollo";
import { FC, Fragment, useCallback } from "react";
import type { Color } from "../../../common/Styling";
import MinoDinoView from "./MinoDinoView";

type Props = {
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
  bg?: Color.Bg;
  actions: {
    [name: string]: {
      bg: Color.Bg;
      text: Color.Text;
      disabled?: boolean;
      action: (id: Dino["id"]) => void | Promise<void>;
    };
  };
};

const DinoListView: FC<Props> = ({ data, actions, bg, shownId }) => {
  const [switchDino] = useSwitchDinoMutation();
  const switchAction = useCallback(
    async (id: Dino["id"]) => {
      if (!shownId) return;
      const { data, errors } = await switchDino({
        variables: { input: { lhs: shownId, rhs: id } },
        refetchQueries: ["PartyView"],
      });

      // TODO: Show indicator flag / toast

      if (!data || errors) {
        console.error(errors);
        return;
      }

      switch (data.switchDino.__typename) {
        case "Indicator":
          console.info(
            `Switch ${data.switchDino.flag ? "did" : "did not"} happened`
          );
          break;
        case "Unauthorized":
          console.warn("Invalid user");
          break;
        case "InputConstraint":
          console.error(
            `${data.switchDino.name} field is incorrect, ${data.switchDino.reason}`
          );
          break;
      }
    },
    [switchDino, shownId]
  );
  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">Box</span>
      <div className="flex flex-row w-full overflow-scroll p-2">
        {(data ?? []).map((props) => (
          <Fragment key={props.id}>
            <MinoDinoView
              bg={bg ?? "bg-white"}
              dino={props}
              actions={{
                Swap: {
                  bg: "bg-teal-400",
                  text: "text-teal-600",
                  action: switchAction,
                },
                ...actions,
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DinoListView;
