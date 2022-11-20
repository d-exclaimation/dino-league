//
//  resolver.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { arg, extendType, nonNull } from "nexus";
import { Dino } from "./core";

export const DinoQueries = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.nonNull.field("dinosaurs", {
      type: "Dino",
      description: "Get all dinosaurs",
      args: {
        input: nonNull(
          arg({
            type: "DinoFilter",
            description: "The filter to apply",
          })
        ),
      },
      resolve: (_root, { input: { take, arena, variant } }, { storage }) => {
        if (storage.isEmpty) {
          storage.generate();
        }
        return storage
          .select(([_, dino]) => {
            const isCorrectArena = !!arena ? dino.arena === arena : true;
            const isCorrectVariant = !!variant
              ? dino.variant === variant
              : true;
            return isCorrectArena && isCorrectVariant;
          })
          .slice(0, take);
      },
    });

    t.field("dinosaur", {
      type: "Dino",
      description: "Find a Dino by their ID",
      args: {
        input: nonNull(
          arg({
            description: "The ID of a Dino to be found",
            type: "SearchByID",
          })
        ),
      },
      resolve: (_root, { input: { id } }, { storage }) => storage.find(id),
    });
  },
});

export const DinoFieldResolvers = extendType({
  type: "Dino",
  definition(t) {
    t.nonNull.float("damage", {
      description: "The damage dealt by this Dinosaur",
      args: {
        arena: nonNull(
          arg({
            type: "Arena",
            description: "The active arena",
          })
        ),
      },
      resolve: (dino, { arena }) =>
        Dino.damage({
          dino,
          arena,
        }),
    });
  },
});
