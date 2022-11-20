//
//  type.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { enumType, objectType } from "nexus";

export const DinoType = objectType({
  name: "Dino",
  definition(t) {
    t.implements("Identifiable");

    t.nonNull.string("name", {
      description: "The name of this Dinosaur",
    });
    t.nonNull.field("variant", {
      type: "Variant",
      description: "The variance for this Dinosaur",
    });
    t.nonNull.int("level", {
      description:
        "The current level of this Dinosaur, which affects its attack and HP",
    });
    t.nonNull.float("hp", {
      description: "The current health of this Dinosaur",
    });
    t.nonNull.float("attack", {
      description: "The base attack for this class of Dinosaur",
    });
    t.nonNull.field("arena", {
      type: "Arena",
      description: "The arena environment this Dinosaur most effective in",
    });
  },
});

export const VariantType = enumType({
  name: "Variant",
  description: "The variant of dinosaur",
  members: [
    { name: "ALOSAUR", value: "alosaur", description: "A versatile dinosaur" },
    {
      name: "AARDONYX",
      value: "aardonyx",
      description: "An early stage in the evolution of sauropods",
    },
    {
      name: "ABELISAURUS",
      value: "abelisaurus",
      description:
        '"Abel\'s lizard" has been reconstructed from a single skull',
    },
  ],
});

export const ArenaType = enumType({
  name: "Arena",
  description: "The battlefield environment",
  members: ["GRASSLAND", "HILLS", "OCEAN", "URBAN", "DESERT"],
});
