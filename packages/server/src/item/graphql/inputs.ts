//
//  inputs.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Field, ID, InputType, Int } from "type-graphql";
import { Dino } from "../../dino/graphql";
import { Consumable } from "./others";
import { Item } from "./type";

@InputType({
  description: "Input for using an item",
})
export class ItemUse {
  @Field(() => ID, {
    description: "The id of the item",
  })
  item!: Item["id"];

  @Field(() => ID, {
    description: "The id of the dino",
  })
  dino!: Dino["id"];
}

@InputType({
  description: "Input for buying a type of item",
})
export class ItemOrder {
  @Field(() => Consumable, {
    description: "The item to buy",
  })
  variant!: Consumable;

  @Field(() => Int, {
    description: "The amount of item to buy",
  })
  amount!: number;
}

@InputType({
  description: "Input for buying items",
})
export class ItemBuy {
  @Field(() => [ItemOrder], {
    description: "The array of items to buy",
  })
  orders!: ItemOrder[];
}
