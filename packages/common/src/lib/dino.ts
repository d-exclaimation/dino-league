//
//  dino.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Jan 2023
//

export const variants = {
  white: {
    arena: "URBAN",
    hp: 75,
    attack: 37.5,
    speed: 60,
    healing: 15,
    variant: "white",
  },
  black: {
    arena: "URBAN",
    hp: 80,
    attack: 40,
    speed: 70,
    healing: 10,
    variant: "black",
  },
  blue: {
    arena: "OCEAN",
    hp: 60,
    attack: 40,
    speed: 80,
    healing: 10,
    variant: "blue",
  },
  green: {
    arena: "GRASSLAND",
    hp: 60,
    attack: 30,
    speed: 100,
    healing: 10,
    variant: "green",
  },
  pink: {
    arena: "GRASSLAND",
    hp: 100,
    attack: 10,
    speed: 50,
    healing: 20,
    variant: "pink",
  },
  red: {
    arena: "DESERT",
    hp: 80,
    attack: 50,
    speed: 40,
    healing: 10,
    variant: "red",
  },
  slate: {
    arena: "HILLS",
    hp: 40,
    attack: 45,
    speed: 80,
    healing: 12,
    variant: "slate",
  },
  yellow: {
    arena: "DESERT",
    hp: 80,
    attack: 20,
    speed: 75,
    healing: 15,
    variant: "yellow",
  },
} as const;

type Variant = keyof typeof variants;

export const ALL_VARIANTS: Variant[] = [
  "black",
  "blue",
  "green",
  "pink",
  "red",
  "slate",
  "white",
  "yellow",
];
