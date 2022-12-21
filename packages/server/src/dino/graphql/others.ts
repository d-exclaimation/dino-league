//
//  others.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Dec 2022
//

import { registerEnumType } from "type-graphql";

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
