//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { PrismaStorage } from "@dino/prisma";
import { Ctx, Field, ObjectType } from "type-graphql";
import { Context } from "../context";
import { Dino } from "../dino/graphql";
import { Identifiable } from "../identifiable/graphql";

@ObjectType({ implements: Identifiable })
export class User extends Identifiable {
  @Field(() => [Dino], {
    description: "Get all Dinosaur in this user's party",
  })
  async party(@Ctx() { prisma }: Context): Promise<Dino[]> {
    const res = await prisma.party.findMany({
      where: { userId: this.id },
      select: { dino: true },
      orderBy: { order: "asc" },
    });
    return res.map(({ dino }) => Dino.from(dino));
  }

  @Field(() => [Dino], {
    description: "Get all Dinosaur in this user's party",
  })
  async box(@Ctx() { prisma }: Context): Promise<Dino[]> {
    const res = await prisma.dino.findMany({
      where: {
        userId: this.id,
        party: null,
      },
      orderBy: {
        level: "asc",
      },
    });
    return res.map((each) => Dino.from(each));
  }

  @Field(() => Boolean, {
    description: "True if the user has a full party",
  })
  async hasFullParty(@Ctx() { prisma, logger }: Context): Promise<boolean> {
    try {
      const count = await prisma.party.count({
        where: {
          userId: this.id,
        },
      });

      return count >= 6;
    } catch (e: unknown) {
      logger.customError(e, "User.hasFullParty");
      return true;
    }
  }

  async reoganiseParty(prisma: PrismaStorage) {
    const res = await prisma.party.findMany({
      where: { userId: this.id },
      orderBy: { order: "asc" },
      select: { dinoId: true },
    });
    const ids = res.map(({ dinoId }) => dinoId);

    // Make sure order doesn't skip a number
    await prisma.$transaction([
      prisma.party.deleteMany({
        where: {
          userId: this.id,
          dinoId: { in: ids },
        },
      }),
      prisma.party.createMany({
        data: ids.map((dinoId, order) => ({ userId: this.id, dinoId, order })),
      }),
    ]);
  }
}
