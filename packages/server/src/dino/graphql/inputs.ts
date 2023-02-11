//
//  inputs.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Dec 2022
//

import { Dino } from "@dino/prisma";
import { Field, ID, InputType, Int } from "type-graphql";
import { Variant } from "./others";

@InputType({
  description: "Filter argument(s) for Dino(s)",
})
export class DinoCreate {
  @Field(() => Variant, {
    description: "The variant of one or many Dino(s)",
  })
  variant!: Variant;

  @Field(() => String, {
    nullable: true,
    description: "The name of this Dinosaur",
  })
  name?: string;

  @Field(() => Int, {
    defaultValue: 1,
    description:
      "The current level of this Dinosaur, which affects its attack and HP",
  })
  level!: number;
}

@InputType({
  description: "Input to switch 2 dinosaur",
})
export class DinoSwitch {
  @Field(() => ID, {
    description: "One of the dino's id to be switched",
  })
  lhs!: Dino["id"];

  @Field(() => ID, {
    description: "One of the dino's id to be switched",
  })
  rhs!: Dino["id"];
}

@InputType({
  description: "Input to rename a dinosaur",
})
export class DinoRename {
  @Field(() => ID, {
    description: "The id of a dinosaur",
  })
  id!: string;

  @Field(() => String, {
    description: "The name value",
  })
  name!: string;
}
