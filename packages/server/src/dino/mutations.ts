//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import { Context } from "../context";
import { CreateDino, Dino, DinoCreate, NewDino } from "./graphql";

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
    const dino = await prisma.createDino(variant, {
      level,
      name: name ?? undefined,
      user: user,
    });
    return new NewDino({ dino: Dino.from(dino) });
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
      user: user,
    });
    return new NewDino({ dino: Dino.from(dino) });
  }
}
