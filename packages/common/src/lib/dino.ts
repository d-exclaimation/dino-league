//
//  dino.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Jan 2023
//

import { Values } from "../types/transform";

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

export const ALL_VARIANTS: Array<keyof typeof variants> = [
  "black",
  "blue",
  "green",
  "pink",
  "red",
  "slate",
  "white",
  "yellow",
];

export const price = {
  get: ({ hp, attack, speed, healing }: Values<typeof variants>) =>
    Math.round(3 * (hp / 100 + attack / 50 + speed / 100 + healing / 40) * 40),
  avg: 273,
  median: 294,
};

export const scaling = (level: number) => Math.pow(1.01, level - 1);
