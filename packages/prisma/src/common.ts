//
//  common.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

/**
 * All properties from T that's not in U
 */
export type Without<T extends object, U extends object> = {
  [P in Exclude<keyof T, keyof U>]: T[P];
};

/**
 * T if it's U, otherwise never
 */
export type Include<T, U> = T extends U ? T : never;

/**
 * All properties from T that's in U
 */
export type Within<T extends object, U extends object> = {
  [P in Include<keyof T, keyof U>]: T[P];
};

/**
 * Common properties when working with createdAt and updatedAt
 */
export type KeyDates = {
  createdAt?: string | Date;
  updatedAt?: string | Date;
};
