//
//  struct.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

/**
 * Get all simple properties of a class
 */
export type Plain<T extends Record<string, any>> = Omit<
  T,
  { [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never }[keyof T]
>;
