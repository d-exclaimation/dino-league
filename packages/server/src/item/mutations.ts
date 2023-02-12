//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Lib } from "@dino/prisma";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import {
  AuthIndicator,
  Indicator,
  InputConstraint,
  Unauthorized,
} from "../common/graphql";
import { Context } from "../context";
import { ItemUse } from "./graphql/inputs";

@Resolver()
export class ItemMutations {
  @Mutation(() => AuthIndicator, {
    description: "Use an item on a dino",
  })
  async useItem(
    @Arg("input") { dino: did, item: iid }: ItemUse,
    @Ctx() { user, prisma }: Context
  ): Promise<AuthIndicator> {
    if (!user) {
      return new Unauthorized({ operation: "useItem" });
    }

    const item = await prisma.item.findUnique({
      where: {
        id: iid,
      },
    });

    const dino = await prisma.dino.findUnique({
      where: {
        id: did,
      },
    });

    if (!item) {
      return new InputConstraint({ name: "item", reason: "does not exist" });
    }

    if (!dino) {
      return new InputConstraint({ name: "dino", reason: "does not exist" });
    }

    if (item.userId !== user.id || dino.userId !== user.id) {
      return new Unauthorized({ operation: "useItem" });
    }

    await prisma.$transaction(async (tx) => {
      await tx.dino.update({
        where: {
          id: dino.id,
        },
        data: Lib.effect(dino, item.variant),
      });
      await tx.item.delete({
        where: {
          id: item.id,
        },
      });
    });

    // TODO: Tell the effect of the item
    return new Indicator({ flag: true });
  }
}
