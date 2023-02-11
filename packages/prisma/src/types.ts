//
//  types.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Nov 2022
//

import type { Without } from "@dino/common";
import { Dino, Prisma } from "@prisma/client";

/**
 * Common properties when working with createdAt and updatedAt
 */
export type KeyDates = {
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

/**
 * Base database types excluding key dates and relationships
 */
export type Base = {
  Dino: Without<Dino, Prisma.DinoInclude & KeyDates>;
};

export { Arena, Consumable, Variant } from "@prisma/client";
export type { Dino, History, Item, Party, User } from "@prisma/client";
