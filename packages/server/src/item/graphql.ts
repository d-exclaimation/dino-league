//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 11 Feb 2023
//

import type { Plain } from "@dino/common";
import { Item as _Item, Lib } from "@dino/prisma";
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Identifiable } from "../identifiable/graphql";

export enum Consumable {
  icecream = "icecream",
  meal = "meal",
  berry = "berry",
  potion = "potion",
  milk = "milk",
  powder = "powder",
  burger = "burger",
  chocolate = "chocolate",
  soda = "soda",
  cupcake = "cupcake",
}

registerEnumType(Consumable, {
  name: "Consumable",
  description: "Types of consumable items",
  valuesConfig: {
    ...Lib.items,
  },
});

@ObjectType({
  implements: [Identifiable],
  description: "A usable item in a player's inventory",
})
export class Item extends Identifiable {
  @Field(() => Consumable, {
    description: "The type of item",
  })
  variant: Consumable;

  constructor({ id, variant }: Plain<Item>) {
    super({ id });
    this.variant = variant;
  }

  static from({ id, variant }: _Item) {
    return new Item({
      id,
      variant: Consumable[variant],
    });
  }
}
