//
//  Egg.tsx
//  dino-league
//
//  Created by d-exclaimation on 08 Jan 2023
//

import { JoiningDinoInfoFragment, useCrackAnEggMutation } from "@dino/apollo";
import { FC, useCallback, useState } from "react";
import { toast } from "react-toastify";
import JoiningDino from "../../common/JoiningDino";

const Egg: FC = () => {
  const [open, setOpen] = useState(false);
  const [joining, setJoining] =
    useState<Omit<JoiningDinoInfoFragment, "__typename">>();
  const [crackAnEgg] = useCrackAnEggMutation();

  const crackAnEggAction = useCallback(async () => {
    const { data, errors } = await crackAnEgg({
      refetchQueries: ["PartyView"],
    });

    if (!data || errors)
      return toast(errors?.at(0)?.message ?? "Unexpected error", {
        type: "error",
        autoClose: 2000,
        pauseOnHover: true,
        theme: "light",
      });

    const res = data.crackAnEgg;
    switch (res.__typename) {
      case "NewDino":
        setJoining(res.dino);
        setOpen(true);
        break;
      case "Unauthorized":
        return toast("Cracking an egg require logging in", {
          type: "error",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
      case "InputConstraint":
        return toast(`Invalid input for ${res.name}, due to ${res.reason}`, {
          type: "error",
          autoClose: 2000,
          pauseOnHover: true,
          theme: "light",
        });
    }
  }, [crackAnEgg, setJoining, setOpen]);

  return (
    <>
      <JoiningDino
        title="Egg cracked into a dinosaur"
        close={() => setOpen(false)}
        dino={joining}
        open={open}
      />
      <div className="flex flex-col items-center justify-center w-full h-[70vh]">
        <img src="/egg.gif" />
        <button
          className="flex items-center justify-center px-3 py-2 rounded-md bg-emerald-500 text-white clickable"
          onClick={crackAnEggAction}
        >
          <img className="w-8 pr-2" src="/coin.svg" /> 300
        </button>
      </div>
    </>
  );
};

export default Egg;
