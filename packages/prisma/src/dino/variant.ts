//
//  variant.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

import type { Dino, Variant } from "@prisma/client";
import type { Within } from "../common";

type DefaultDinoProps = Within<
  Dino,
  {
    hp: never;
    arena: never;
    attack: never;
    variant: never;
  }
>;

export const variants: Record<Variant, DefaultDinoProps> = {
  alosaur: {
    arena: "GRASSLAND",
    hp: 100,
    attack: 50,
    variant: "alosaur",
  },
  aardonyx: {
    arena: "DESERT",
    hp: 130,
    attack: 20,
    variant: "aardonyx",
  },
  abelisaurus: {
    arena: "URBAN",
    hp: 90,
    attack: 60,
    variant: "abelisaurus",
  },
};

export const ALL_VARIANTS: Variant[] = ["aardonyx", "abelisaurus", "alosaur"];
