//
//  HomeButton.tsx
//  dino-league
//
//  Created by d-exclaimation on 07 Jan 2023
//

import type { FC } from "react";
import { useNavigate } from "react-router-dom";

const HomeButton: FC = () => {
  const nav = useNavigate();
  return (
    <button
      className="fixed top-2 right-2 clickable bg-black/5 rounded-lg"
      onClick={() => nav("/")}
    >
      <img className="w-10 md:w-12" src="/back.svg" />
    </button>
  );
};

export default HomeButton;
