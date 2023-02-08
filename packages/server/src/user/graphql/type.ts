//
//  type.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import { Struct } from "@dino/common";
import { User as _User } from "@dino/prisma";
import { Ctx, Field, Int, ObjectType } from "type-graphql";
import type { Context } from "../../context";
import { Arena, Dino } from "../../dino/graphql";
import { Identifiable } from "../../identifiable/graphql";

@ObjectType({
  implements: Identifiable,
  description: "A valid user of the game",
})
export class User extends Identifiable {
  @Field(() => Arena, {
    description: "The current arena the user is in",
  })
  location: Arena;

  @Field(() => Int, {
    description: "The amount of money owned by the user",
  })
  cash: number;

  constructor({ id, location, cash }: Struct.infer<User>) {
    super({ id });
    this.location = location;
    this.cash = cash;
  }

  static from({ id, location, cash }: _User) {
    return new User({ id, location: Arena[location], cash });
  }

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
}
