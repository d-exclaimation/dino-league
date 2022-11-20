//
//  variants.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { id } from "../../identifiable/utils/id";
import type { NexusGenEnums, NexusGenObjects } from "../../nexus";

const did = () => id("Dino");

type NewDino = (args: {
  level: number;
  name?: string;
}) => NexusGenObjects["Dino"];

const variants: Record<NexusGenEnums["Variant"], NewDino> = {
  alosaur: ({ level, name }) => ({
    id: did(),
    name: name ?? "Alosaur",
    arena: "GRASSLAND",
    level,
    hp: Math.pow(1.01, level - 1) * 100,
    attack: 50,
    variant: "alosaur",
  }),
  aardonyx: ({ level, name }) => ({
    id: did(),
    name: name ?? "Aardonyx",
    arena: "DESERT",
    level,
    hp: Math.pow(1.01, level - 1) * 130,
    attack: 20,
    variant: "aardonyx",
  }),
  abelisaurus: ({ level, name }) => ({
    id: did(),
    name: name ?? "Abelisaurus",
    arena: "URBAN",
    level,
    hp: Math.pow(1.01, level - 1) * 90,
    attack: 60,
    variant: "abelisaurus",
  }),
};

/**
 * Create a new dino
 * @param variant Variant of dino
 * @param args Level and name for this dino
 * @returns A new Dino
 */
export const create = (
  variant: NexusGenEnums["Variant"],
  args: Parameters<NewDino>[0]
) => variants[variant](args);
