//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

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
    // TODO: Error handling
    const res = await prisma.party.findMany({
      where: {
        userId: this.id,
      },
      select: {
        dino: true,
      },
    });
    return res.map(({ dino }) => Dino.from(dino));
  }

  @Field(() => [Dino], {
    description: "Get all Dinosaur in this user's party",
  })
  async box(@Ctx() { prisma }: Context): Promise<Dino[]> {
    // TODO: Handle error
    const res = await prisma.dino.findMany({
      where: {
        userId: this.id,
        party: null,
      },
    });
    return res.map((each) => Dino.from(each));
  }
}
