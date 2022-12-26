//
//  queries.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { SearchByID } from "../identifiable/graphql";
import { Dino, DinoFilter } from "./graphql";

@Resolver()
export class DinoQueries {
  @Query(() => Dino, {
    nullable: true,
    description: "Find a Dino by their ID",
  })
  async dinosaur(
    @Arg("input") { id }: SearchByID,
    @Ctx() { prisma, logger }: Context
  ): Promise<Dino | undefined> {
    return logger.trace({ scope: "dinosaur" }, async () => {
      const res = await prisma.dino.findUnique({ where: { id } });
      if (!res) {
        return undefined;
      }
      return Dino.from(res);
    });
  }

  @Query(() => [Dino], {
    description: "Get all dinosaurs",
  })
  async dinosaurs(
    @Arg("input") { take, arena, variant }: DinoFilter,
    @Ctx() { prisma, user, logger }: Context
  ): Promise<Dino[]> {
    if (!user) {
      logger.scope("dinosaurs").warn("A findMany is requested by a non user");
      return [];
    }
    if (!arena && !variant) {
      const res = await prisma.dino.findMany({
        where: { userId: user.id },
        take,
      });
      return res.map((each) => Dino.from(each));
    }
    const res = await prisma.dino.findMany({
      where: {
        userId: user.id,
        OR: {
          arena: arena ?? undefined,
          variant: variant ?? undefined,
        },
      },
      take,
    });
    return res.map((each) => Dino.from(each));
  }
}
