//
//  queries.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { SearchById } from "../identifiable/graphql";
import { Dino, DinoFilter } from "./graphql";

@Resolver()
export class DinoQueries {
  @Query(() => Dino, {
    nullable: true,
    description: "Find a Dino by their ID",
  })
  async dinosaur(
    @Arg("input") { id }: SearchById,
    @Ctx() { prisma }: Context
  ): Promise<Dino | undefined> {
    const res = await prisma.dino.findUnique({ where: { id } });
    if (!res) {
      return undefined;
    }
    return Dino.new(res);
  }

  @Query(() => [Dino], {
    description: "Get all dinosaurs",
  })
  async dinosaurs(
    @Arg("input") { take, arena, variant }: DinoFilter,
    @Ctx() { prisma }: Context
  ): Promise<Dino[]> {
    if (!arena && !variant) {
      return (await prisma.dino.findMany({ take })).map((each) =>
        Dino.new(each)
      );
    }
    const res = await prisma.dino.findMany({
      where: {
        OR: {
          arena: arena ?? undefined,
          variant: variant ?? undefined,
        },
      },
      take,
    });
    return res.map((each) => Dino.new(each));
  }
}