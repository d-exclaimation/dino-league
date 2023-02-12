//
//  inputs.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Field, ID, InputType } from "type-graphql";
import { Dino } from "../../dino/graphql";
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
