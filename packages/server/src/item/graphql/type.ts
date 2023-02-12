//
//  type.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import type { Plain } from "@dino/common";
import type { Item as _Item } from "@dino/prisma";
import { Field, ObjectType } from "type-graphql";
import { Identifiable } from "../../identifiable/graphql";
import { Consumable } from "./others";

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
