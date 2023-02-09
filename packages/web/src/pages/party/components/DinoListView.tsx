//
//  DinoListView.tsx
//  dino-league
//
//  Created by d-exclaimation on 27 Dec 2022
//

import type { Palette } from "@d-exclaimation/common/tailwind";
import { macrotask } from "@d-exclaimation/common/v8";
import {
  Dino,
  QuickDinoInfoFragment,
  useSellDinoMutation,
  useSwitchDinoMutation,
} from "@dino/apollo";
import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useToastableMutation } from "../../../common/Toast";
import MinoDinoView from "./MinoDinoView";

type Props = {
  title: string;
  data: QuickDinoInfoFragment[] | undefined;
  shownId?: Dino["id"] | null;
  bg?: Palette["bg"];
  lastDino?: boolean;
  actions: {
    [name: string]: {
      bg: Palette["bg"];
      text: Palette["bg"];
      disabled?: boolean;
      action: (id: Dino["id"]) => void | Promise<void>;
    };
  };
};

const DinoListView: FC<Props> = ({
  title,
  data,
  actions,
  bg,
  shownId,
  lastDino,
}) => {
  const nav = useNavigate();
  const [switchDino] = useSwitchDinoMutation();
  const [sellDino] = useSellDinoMutation();

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

  const sellAction = useToastableMutation(
    {
      async mutation(id: Dino["id"]) {
        const { data, errors } = await sellDino({
          variables: {
            input: id,
          },
          refetchQueries: ["PartyView", "Me"],
        });

        if (!data || errors) {
          throw errors?.at(0)?.message ?? "Unexpected error happened";
        }

        switch (data.sellDino.__typename) {
          case "Indicator":
            if (shownId === id) {
              macrotask(() => nav("/party"));
            }
            return "Dinosaurs sold";
          case "Unauthorized":
            throw "You can't sell a dino you don't own";
          case "InputConstraint":
            throw `${data.sellDino.name} field is incorrect, ${data.sellDino.reason}`;
        }
      },
    },
    [sellDino, shownId, nav]
  );

  return (
    <div className="py-2">
      <span className="mx-4 text-xl font-semibold">{title}</span>
      <div className="flex flex-row w-full overflow-scroll p-2">
        {(data ?? []).map((props) => (
          <Fragment key={props.id}>
            <MinoDinoView
              bg={(bg as Palette["bg"]) ?? "bg-white"}
              dino={props}
              actions={{
                Swap: {
                  bg: "bg-teal-400",
                  text: "text-teal-600",
                  action: (id) => switchAction(id),
                },
                ...actions,
                Sell: {
                  bg: "bg-red-400",
                  text: "text-red-600",
                  disabled: lastDino,
                  action: (id) => sellAction(id),
                },
              }}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default DinoListView;
