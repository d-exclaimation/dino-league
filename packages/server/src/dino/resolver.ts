//
//  resolver.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { DinoModule } from "@dino/prisma";
import { arg, extendType, nonNull } from "nexus";

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
      async resolve(_r, { input: { take, arena, variant } }, { prisma }) {
        return prisma.dino.findMany({
          where: {
            OR: {
              arena: arena ?? undefined,
              variant: variant ?? undefined,
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
      async resolve(_r, { input: { id } }, { prisma }) {
        return prisma.dino.findUnique({ where: { id } });
      },
    });
  },
});

export const DinoMutations = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createDino", {
      type: "CreateDino",
      description: "Create a Dino",
      args: {
        input: nonNull(
          arg({
            description: "The arguments to create a dino",
            type: "DinoCreate",
          })
        ),
      },
      async resolve(_, { input: { level, name, variant } }, { prisma, user }) {
        if (!user) {
          return { operation: "createDino" };
        }
        const dino = await prisma.createDino(variant, {
          level,
          name: name ?? undefined,
          user: user,
        });
        return { dino };
      },
    });

    t.nonNull.field("createRandomDino", {
      type: "CreateDino",
      description: "Create a randomly generated Dino",
      async resolve(_r, _a, { prisma, user }) {
        if (!user) {
          return { operation: "createDino" };
        }
        const dino = await prisma.createRandomDino({
          level: 10,
          user: user,
        });
        return { dino };
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
        DinoModule.damage({
          dino,
          arena,
        }),
    });
  },
});
