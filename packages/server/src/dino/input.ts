//
//  input.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { inputObjectType } from "nexus";

export const DinoFilterInput = inputObjectType({
  name: "DinoFilter",
  description: "Filter argument(s) for Dino(s)",
  definition(t) {
    t.field("variant", {
      type: "Variant",
      description: "The variant of one or many Dino(s)",
    });
    t.field("arena", {
      type: "Arena",
      description: "The arena of choice of one or many Dino(s)",
    });
    t.nonNull.int("take", {
      description: "The limit of result to take",
      default: 20,
    });
  },
});

export const DinoCreateInput = inputObjectType({
  name: "DinoCreate",
  description: "Creation argument(s) for Dino(s)",
  definition(t) {
    t.nonNull.field("variant", {
      type: "Variant",
      description: "The variant of the Dino",
    });

    t.nonNull.int("level", {
      description: "The level of the Dino",
      default: 1,
    });

    t.string("name", {
      description: "The optional nickname of the Dino",
    });
  },
});
