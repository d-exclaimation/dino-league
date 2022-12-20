//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { PropsOf } from "@dino/common";
import { Field, Float, Int, ObjectType, registerEnumType } from "type-graphql";
import { Identifiable } from "../identifiable/graphql";

@ObjectType({ implements: Identifiable })
export class Dino extends Identifiable {
  @Field({ description: "The name of this Dinosaur" })
  name!: string;

  @Field(() => Variant, {
    description: "The variance for this Dinosaur",
  })
  variant!: Variant;

  @Field(() => Int, {
    description:
      "The current level of this Dinosaur, which affects its attack and HP",
  })
  level!: number;

  @Field(() => Float, {
    description: "The current health of this Dinosaur",
  })
  hp!: number;

  @Field(() => Float, {
    description: "The attack for this class of Dinosaur",
  })
  attack!: number;

  @Field(() => Float, {
    description: "The speed for this class of Dinosaur",
  })
  speed!: number;

  @Field(() => Float, {
    description: "The amount of healing this class Dinosaur gain when resting",
  })
  healing!: number;

  @Field(() => Float, {
    description: "The price of this dinosaur",
  })
  price!: number;

  @Field(() => Arena, {
    description: "The arena environment this Dinosaur most effective in",
  })
  arena!: Arena;

  constructor({ id, ...rest }: PropsOf<Dino>) {
    super(id);
    Object.assign(this, rest);
  }
}

export enum Variant {
  blue = "blue",
  black = "black",
  green = "green",
  pink = "pink",
  red = "red",
  slate = "slate",
  white = "white",
  yellow = "yellow",
}

registerEnumType(Variant, {
  name: "Variant",
  description: "The variant of dinosaur",
  valuesConfig: {
    blue: { description: "Jumping expert" },
    black: { description: "Bold comes in black" },
    green: { description: "Runs swiftly" },
    pink: { description: "Ouch.." },
    red: {
      description: "A good offense in the best defense",
    },
    slate: { description: "Boom" },
    white: { description: "Jack of all trades" },
    yellow: {
      description: "Can't lose if you don't get hit",
    },
  },
});

export enum Arena {
  GRASSLAND = "GRASSLAND",
  HILLS = "HILLS",
  OCEAN = "OCEAN",
  URBAN = "URBAN",
  DESERT = "DESERT",
}

registerEnumType(Arena, {
  name: "Arena",
  description: "The battlefield environment",
});
