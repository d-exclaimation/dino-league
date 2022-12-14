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
import { FC, Fragment } from "react";
import type { Color } from "../../../common/Styling";
import { useToastableMutation } from "../../../common/Toast";
import MinoDinoView from "./MinoDinoView";

type Props = {
  title: string;
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

const DinoListView: FC<Props> = ({ title, data, actions, bg, shownId }) => {
  const [switchDino] = useSwitchDinoMutation();
  const switchAction = useToastableMutation(
    {
      async mutation(id: Dino["id"]) {
        if (!shownId) throw "No given dinosaur to switch with";
        const { data, errors } = await switchDino({
          variables: { input: { lhs: shownId, rhs: id } },
          refetchQueries: ["PartyView"],
        });

        if (!data || errors) {
          throw errors?.at(0)?.message ?? "Unexpected error happened";
        }

        switch (data.switchDino.__typename) {
          case "Indicator":
            return data.switchDino.flag
              ? "Dinosaurs switched"
              : "No switch is necessary";
          case "Unauthorized":
            throw "You can't switch the same dinosaur";
          case "InputConstraint":
            throw `${data.switchDino.name} field is incorrect, ${data.switchDino.reason}`;
        }
      },
      pending: "Switching dino...",
    },
    [switchDino, shownId]
  );

  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">{title}</span>
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
                  action: (id) => switchAction(id),
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
