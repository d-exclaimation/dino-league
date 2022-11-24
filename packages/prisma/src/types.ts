//
//  types.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { Dino, Prisma } from "@prisma/client";
import { Without } from "@dino/common";

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

export { Arena, Variant } from "@prisma/client";
export type { Dino, Party, User } from "@prisma/client";
