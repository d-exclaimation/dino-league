//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { randomInt, weightedRandomElement } from "@dino/common";
import { PrismaKnownError } from "@dino/prisma";
import { Arg, Ctx, ID, Mutation, Resolver } from "type-graphql";
import {
  AuthIndicator,
  Indicator,
  InputConstraint,
  Unauthorized,
} from "../common/graphql";
import type { Context } from "../context";
import {
  CreateDino,
  Dino,
  DinoCreate,
  DinoRename,
  DinoSwitch,
  NewDino,
} from "./graphql";

@Resolver()
export class DinoMutations {
  @Mutation(() => CreateDino, {
    description: "Create a Dino",
  })
  async createDino(
    @Arg("input") { level, name, variant }: DinoCreate,
    @Ctx() { prisma, user, ...rest }: Context
  ): Promise<CreateDino> {
    if (!user) {
      return new Unauthorized({ operation: "createDino" });
    }

    if (level < 1) {
      return new InputConstraint({
        name: "level",
        reason: "Value cannot be 0 or negative",
      });
    }

    const res = await prisma.createDino(variant, {
      level,
      name: !!name ? name : undefined,
      userId: user.id,
    });

    return new NewDino({ dino: Dino.from(res) });
  }

  @Mutation(() => CreateDino, {
    description: "Create a randomly generated Dino",
  })
  async crackAnEgg(@Ctx() { prisma, user }: Context): Promise<CreateDino> {
    if (!user) {
      return new Unauthorized({ operation: "createDino" });
    }

    const { _max, _min } = await prisma.dino.aggregate({
      where: { userId: user.id },
      _max: { level: true },
      _min: { level: true },
    });

    const [min, max] = [_min.level, _max.level];

    const dino = await prisma.createRandomDino({
      level: weightedRandomElement([
        { weight: 1, value: randomInt({ start: max ?? 1, end: 125 }) },
        { weight: 1, value: randomInt({ start: 1, end: min ?? 25 }) },
        { weight: 3, value: randomInt({ start: min ?? 1, end: max ?? 25 }) },
      ]),
      userId: user.id,
    });
    return new NewDino({ dino: Dino.from(dino) });
  }

  @Mutation(() => AuthIndicator, {
    description: "Rename a dinosaur",
  })
  async renameDino(
    @Arg("input") { id, name }: DinoRename,
    @Ctx() { prisma, user }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "switchDino" });
    }
    const exist = await prisma.dino.findFirst({
      where: { id, userId: user.id },
      select: { id: true },
    });
    if (!exist) {
      return new Unauthorized({ operation: "switchDino" });
    }

    await prisma.dino.update({
      data: { name },
      where: { id },
    });

    return new Indicator({ flag: true });
  }

  @Mutation(() => AuthIndicator, {
    description: "Switch 2 dino around",
  })
  async switchDino(
    @Arg("input") { lhs, rhs }: DinoSwitch,
    @Ctx() { prisma, user }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "switchDino" });
    }
    const res = await prisma.dino.findMany({
      where: { id: { in: [lhs, rhs] }, userId: user.id },
      include: { party: true },
    });

    if (res.length < 2) {
      return new Unauthorized({ operation: "switchDino" });
    }

    const [left, right] = res;

    // Within party
    if (!!left.party && !!right.party) {
      await prisma.$transaction([
        prisma.party.update({
          where: { dinoId: left.id },
          data: { order: right.party.order },
        }),
        prisma.party.update({
          where: { dinoId: right.id },
          data: { order: left.party.order },
        }),
      ]);

      return new Indicator({ flag: true });
    }
    // Out party
    if (!!left.party) {
      await prisma.party.update({
        where: { dinoId: left.id },
        data: { dinoId: right.id },
      });

      return new Indicator({ flag: true });
    }
    // In party
    if (!!right.party) {
      await prisma.party.update({
        where: { dinoId: right.id },
        data: { dinoId: left.id },
      });
      return new Indicator({ flag: true });
    }

    return new Indicator({ flag: false });
  }

  @Mutation(() => AuthIndicator, {
    description: "Put a dino from party to the box",
  })
  async putDinoToBox(
    @Arg("input", () => ID) input: string,
    @Ctx() { prisma, user, logger }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "putDinoToBox" });
    }

    try {
      const res = await prisma.party.findMany({
        where: { userId: user.id, dinoId: { not: input } },
        orderBy: { order: "asc" },
        select: { dinoId: true },
      });
      const ids = res.map(({ dinoId }) => dinoId);

      // Make sure order doesn't skip a number
      await prisma.$transaction([
        prisma.party.deleteMany({
          where: { userId: user.id },
        }),
        prisma.party.createMany({
          data: ids.map((dinoId, order) => ({
            userId: user.id,
            dinoId,
            order,
          })),
        }),
      ]);

      return new Indicator({ flag: true });
    } catch (e: unknown) {
      logger.customError(e, "putDinoToBox");
      if (!(e instanceof PrismaKnownError)) {
        throw e;
      }

      if (e.code === "P2015") {
        return new Unauthorized({ operation: "putDinoToBox" });
      }

      return new Indicator({ flag: false });
    }
  }

  @Mutation(() => AuthIndicator, {
    description: "Put a dino from box to the party",
  })
  async addDinoToParty(
    @Arg("input", () => ID) input: string,
    @Ctx() { prisma, user, logger, ...rest }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "addDinoToParty" });
    }

    if (await user.hasFullParty({ prisma, user, logger, ...rest })) {
      return new Indicator({ flag: false });
    }

    try {
      const dino = await prisma.dino.findUnique({
        where: { id: input },
        select: { id: true, user: { select: { id: true } } },
      });

      if (!dino) {
        return new InputConstraint({
          name: "input",
          reason: "Not a valid Dino id",
        });
      }

      if (dino.user?.id !== user.id) {
        return new Unauthorized({ operation: "addDinoToParty" });
      }

      await prisma.addToParty({ dinoId: dino.id, userId: user.id });

      return new Indicator({ flag: true });
    } catch (e: unknown) {
      logger.customError(e, "addDinoToParty");
      if (!(e instanceof PrismaKnownError)) {
        throw e;
      }

      if (e.code === "P2015" || e.code === "P2003") {
        return new Unauthorized({ operation: "addDinoToParty" });
      }

      return new Indicator({ flag: false });
    }
  }

  @Mutation(() => AuthIndicator, {
    description: "Sell a dino and earn money back",
  })
  async sellDino(
    @Arg("input", () => ID) input: string,
    @Ctx() { prisma, user, logger }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "sellDino" });
    }

    try {
      const dino = await prisma.dino.findUnique({
        where: { id: input },
        select: {
          id: true,
          price: true,
          user: { select: { id: true } },
          party: true,
        },
      });

      if (!dino) {
        return new InputConstraint({
          name: "input",
          reason: "Not a valid Dino id",
        });
      }

      if (dino.user?.id !== user.id) {
        return new Unauthorized({ operation: "addDinoToParty" });
      }

      await prisma.$transaction(async (tx) => {
        if (dino.party !== null) {
          // Reorganise party and remove from party
          const res = await tx.party.findMany({
            where: { userId: user.id, dinoId: { not: input } },
            orderBy: { order: "asc" },
            select: { dinoId: true },
          });
          const ids = res.map(({ dinoId }) => dinoId);

          await tx.party.deleteMany({
            where: { userId: user.id },
          });
          await tx.party.createMany({
            data: ids.map((dinoId, order) => ({
              userId: user.id,
              dinoId,
              order,
            })),
          });
        }

        await tx.dino.delete({
          where: { id: input },
        });

        await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            cash: {
              increment: Math.round(dino.price),
            },
          },
        });
      });

      return new Indicator({ flag: true });
    } catch (e: unknown) {
      logger.customError(e, "addDinoToParty");
      if (!(e instanceof PrismaKnownError)) {
        throw e;
      }

      if (e.code === "P2015" || e.code === "P2003") {
        return new Unauthorized({ operation: "addDinoToParty" });
      }

      return new Indicator({ flag: false });
    }
  }
}
