//
//  resolver.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { DinoModule } from "@dino/prisma";
import { arg, extendType, nonNull } from "nexus";

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

    t.nonNull.float("maxHp", {
      description: "The max hp of this Dinosaur",
      resolve: (dino) => DinoModule.maxHp(dino.variant, dino.level),
    });

    t.nonNull.int("percentage", {
      description: "The hp percentage of this Dinosaur",
      resolve: (dino) =>
        Math.round(
          (dino.hp * 100) / DinoModule.maxHp(dino.variant, dino.level)
        ),
    });
  },
});
