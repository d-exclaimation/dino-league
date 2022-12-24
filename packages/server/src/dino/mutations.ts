//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import { Context } from "../context";
import { CreateDino, Dino, DinoCreate, DinoSwitch, NewDino } from "./graphql";

@Resolver()
export class DinoMutations {
  @Mutation(() => CreateDino, {
    description: "Create a Dino",
  })
  async createDino(
    @Arg("input") { level, name, variant }: DinoCreate,
    @Ctx() { prisma, user }: Context
  ) {
    if (!user) {
      return new Unauthorized({ operation: "createDino" });
    }
    const hasFullParty = await user.hasFullParty({ prisma, user });

    const res = await prisma.createDino(variant, {
      level,
      name: name ?? undefined,
      userId: user.id,
    });

    // New dino add to party if available
    if (!hasFullParty) {
      await prisma.addToParty({ dinoId: res.id, userId: user.id });
    }

    return new NewDino({ dino: Dino.from(res) });
  }

  @Mutation(() => CreateDino, {
    description: "Create a randomly generated Dino",
  })
  async createRandomDino(@Ctx() { prisma, user }: Context) {
    if (!user) {
      return new Unauthorized({ operation: "createDino" });
    }
    const dino = await prisma.createRandomDino({
      level: 10,
      userId: user.id,
    });
    return new NewDino({ dino: Dino.from(dino) });
  }

  @Mutation(() => Boolean, {
    description: "Switch 2 dino around",
  })
  async switchDino(
    @Arg("input") { lhs, rhs }: DinoSwitch,
    @Ctx() { prisma, user }: Context
  ): Promise<Boolean> {
    if (!user) {
      return false;
    }
    const res = await prisma.dino.findMany({
      where: {
        id: {
          in: [lhs, rhs],
        },
        userId: user.id,
      },
      include: {
        party: true,
      },
    });

    if (res.length < 2) {
      return false;
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

      return true;
    }
    // Out party
    if (!!left.party) {
      await prisma.party.update({
        where: {
          dinoId: left.id,
        },
        data: {
          dinoId: right.id,
        },
      });

      return true;
    }

    // In party
    if (!!right.party) {
      await prisma.party.update({
        where: {
          dinoId: right.id,
        },
        data: {
          dinoId: left.id,
        },
      });
      return true;
    }

    return false;
  }
}
