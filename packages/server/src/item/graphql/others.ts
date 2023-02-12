//
//  others.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { Lib } from "@dino/prisma";
import { registerEnumType } from "type-graphql";

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
