//
//  variant.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

import { Without } from "@dino/common";
import type { Dino, Variant } from "@prisma/client";
import { KeyDates } from "../types";

type DefaultDinoProps = Without<
  Omit<Dino, "id" | "name" | "userId" | "level" | "price">,
  KeyDates
>;

export const variants: Record<Variant, DefaultDinoProps> = {
  white: {
    arena: "URBAN",
    hp: 75,
    attack: 37.5,
    speed: 60,
    healing: 30,
    variant: "white",
  },
  black: {
    arena: "URBAN",
    hp: 80,
    attack: 40,
    speed: 70,
    healing: 20,
    variant: "black",
  },
  blue: {
    arena: "OCEAN",
    hp: 60,
    attack: 40,
    speed: 80,
    healing: 20,
    variant: "blue",
  },
  green: {
    arena: "GRASSLAND",
    hp: 60,
    attack: 30,
    speed: 100,
    healing: 20,
    variant: "green",
  },
  pink: {
    arena: "GRASSLAND",
    hp: 100,
    attack: 10,
    speed: 50,
    healing: 40,
    variant: "pink",
  },
  red: {
    arena: "DESERT",
    hp: 80,
    attack: 50,
    speed: 40,
    healing: 20,
    variant: "red",
  },
  slate: {
    arena: "HILLS",
    hp: 40,
    attack: 45,
    speed: 80,
    healing: 24,
    variant: "slate",
  },
  yellow: {
    arena: "DESERT",
    hp: 80,
    attack: 20,
    speed: 75,
    healing: 30,
    variant: "yellow",
  },
};

export function adjusted(
  { hp, attack, speed, healing, ...rest }: DefaultDinoProps,
  level: number
) {
  const scale = Math.pow(1.01, level - 1);
  const price = Math.round(
    3 * (hp / 100 + attack / 50 + speed / 100 + healing / 40) * 40
  );
  return {
    hp: scale * hp,
    attack: scale * attack,
    speed: scale * speed,
    healing: scale * healing,
    price: scale * price,
    ...rest,
  };
}

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
