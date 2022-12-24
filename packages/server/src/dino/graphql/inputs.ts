//
//  inputs.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Dec 2022
//

import { Dino } from "@dino/prisma";
import { Field, ID, InputType, Int } from "type-graphql";
import { Arena, Variant } from "./others";

@InputType({
  description: "Filter argument(s) for Dino(s)",
})
export class DinoFilter {
  @Field(() => Variant, {
    nullable: true,
    description: "The variant of one or many Dino(s)",
  })
  variant?: Variant;

  @Field(() => Arena, {
    nullable: true,

    description: "The arena of choice of one or many Dino(s)",
  })
  arena?: Arena;

  @Field(() => Int, {
    description: "The limit of result to take",
    defaultValue: 20,
  })
  take!: number;
}

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
