//
//  damage.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { random } from "@dino/common";
import { NexusGenEnums, NexusGenObjects } from "../../nexus";

type DinoArenaArgs = {
  dino: NexusGenObjects["Dino"];
  arena: NexusGenEnums["Arena"];
};

/**
 * Compute the damage by this Dino within this Arena
 * @param param0 Dino and arena to calculate damage
 * @returns The damage dealt by this Dino
 */
export const damage = ({
  dino: { arena, level, attack },
  arena: env,
}: DinoArenaArgs) => {
  const boost = arena === env ? 1.5 : 1;
  const base = Math.pow(1.01, level - 1) * attack * boost;
  return random({ start: attack, end: base });
};
