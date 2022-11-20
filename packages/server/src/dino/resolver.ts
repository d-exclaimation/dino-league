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
      resolve: async (
        _root,
        { input: { take, arena, variant } },
        { prisma }
      ) => {
        return await prisma.dino.findMany({
          where: {
            OR: {
              arena: !!arena ? arena : undefined,
              variant: !!variant ? variant : undefined,
            },
          },
          take,
        });
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
      resolve: async (_root, { input: { id } }, { prisma }) => {
        return await prisma.dino.findUnique({
          where: {
            id,
          },
        });
      },
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
