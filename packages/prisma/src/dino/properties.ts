//
//  properties.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

import { random, Within } from "@dino/common";
import type { Arena, Dino } from "@prisma/client";

type DinoDamageArgs = Within<
  Dino,
  { arena: never; level: never; attack: never }
>;

type DamageArgs<D extends DinoDamageArgs> = {
  dino: D;
  arena: Arena;
};

export const damage = <D extends DinoDamageArgs>({
  dino: { arena, level, attack },
  arena: env,
}: DamageArgs<D>) => {
  const boost = arena === env ? 1.5 : 1;
  const base = Math.pow(1.01, level - 1) * attack * boost;
  return random({ start: attack, end: base });
};
