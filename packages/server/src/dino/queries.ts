//
//  queries.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Arg, Ctx, Query, Resolver } from "type-graphql";
import type { Context } from "../context";
import { SearchByID } from "../identifiable/graphql";
import { Dino } from "./graphql";

@Resolver()
export class DinoQueries {
  @Query(() => Dino, {
    nullable: true,
    description: "Find a Dino by their ID",
  })
  async dinosaur(
    @Arg("input") { id }: SearchByID,
    @Ctx() { prisma }: Context
  ): Promise<Dino | undefined> {
    const res = await prisma.dino.findUnique({ where: { id } });
    if (!res) {
      return undefined;
    }
    return Dino.from(res);
  }
}
