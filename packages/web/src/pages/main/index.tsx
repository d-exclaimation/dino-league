//
//  index.tsx
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { useAuth } from "@dino/apollo";
import { FC, Fragment, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { InferProps } from "../../common/FC";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import LoadingBar from "../common/LoadingBar";
import DashboardMenu from "./components/DashboardMenu";

const MainPage: FC = () => {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  const dashboard = useMemo(
    (): InferProps<typeof DashboardMenu>[] => [
      {
        icon: "/party.png",
        title: "Party",
        subtitle: "View your dinosaurs",
        action: () => nav("/party"),
      },
      {
        icon: "/pvp.png",
        title: "Battle",
        subtitle: "Battle other players",
        action: () => nav("/pvp"),
      },
      {
        icon: "/pve.png",
        title: "Quest",
        subtitle: "Take on a random quest battle",
        action: () => nav("/pve"),
      },
      {
        icon: "/monster-shop.png",
        title: "Barrack",
        subtitle: "Recruit a new dinosaur",
        action: () => nav("/barrack"),
      },
      {
        icon: "/shop.png",
        title: "Shop",
        subtitle: "Buy items",
        action: () => nav("/shop"),
      },
      {
        icon: "/inventory.png",
        title: "Inventory",
        subtitle: "Manage your items",
        action: () => nav("/inventory"),
      },
    ],
    []
  );

  if (loading) {
    return <LoadingBar text="Loading..." />;
  }

  return (
    <div className="w-screen min-h-screen h-max background">
      <div className="flex flex-col justify-start items-start my-2 mx-2">
        <div className="flex flex-row justify-between items-start w-full">
          <img
            className="w-14 my-2 rounded-full"
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${user?.id}.svg`} // TODO: use user id or username
          />
          <button className="rounded-lg bg-white clickable">
            <img className="w-10 md:w-12 p-2" src="/logout.svg" />
          </button>
        </div>
        <span className="px-2">Hello</span>
        <span className="font-medium text-xl md:text-2xl px-2">
          {user?.id}
          <span className="mx-1 text-base text-black/50">{user?.cash}</span>
        </span>
      </div>
      <div className="py-3 px-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {dashboard.map((props, i) => (
            <Fragment key={i}>
              <DashboardMenu {...props} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthRedirect(MainPage);
