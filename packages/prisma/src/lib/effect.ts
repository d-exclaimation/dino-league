//
//  effect.ts
//  dino-league
//
//  Created by d-exclaimation on 12 Feb 2023
//

import { clamp, Lib } from "@dino/common";
import type { Dino, Item, Prisma } from "@prisma/client";

const LEVEL_UP = { multiply: Lib.LEVEL_SCALE };

/**
 * Apply an item into dino and return changed stat
 * @param dino Dinosaur previous stats
 * @param item Item being applied
 * @returns The stats change
 */
export function effect(
  dino: Dino,
  item: Item["variant"]
): Prisma.DinoUpdateArgs["data"] {
  const maxHp = Lib.scaling(dino.level) * Lib.variants[dino.variant].hp;
  switch (item) {
    case "meal":
      return {
        hp: Lib.scaling(dino.level) * Lib.variants[dino.variant].hp,
      };
    case "icecream":
      return {
        level: { increment: 1 },
        attack: LEVEL_UP,
        speed: LEVEL_UP,
        healing: LEVEL_UP,
        hp: LEVEL_UP,
        price: Math.round(Lib.scaling(dino.level) * dino.price),
      };
    case "berry":
      return {
        hp: clamp(dino.hp + 0.4 * maxHp, { min: 0, max: maxHp }),
      };
    case "burger":
      return {
        healing: {
          multiply: 1.05,
        },
      };
    case "chocolate":
      return {
        attack: {
          multiply: 1.05,
        },
      };
    case "soda":
      return {
        speed: {
          multiply: 1.05,
        },
      };
    case "potion":
      return {
        hp: clamp(dino.hp + 200, { min: 0, max: maxHp }),
      };
    case "powder":
      return {
        hp: dino.hp + 150,
      };
    case "cupcake":
      return {
        healing: { multiply: 1.01 },
        attack: { multiply: 1.01 },
      };
    case "milk": {
      const scale = Lib.scaling(dino.level);
      const base = Lib.variants[dino.variant];
      return {
        attack: base.attack * scale,
        healing: base.healing * scale,
        speed: base.speed * scale,
        hp: clamp(dino.hp + 0.2 * maxHp, { min: 0, max: maxHp }),
      };
    }
  }
}
