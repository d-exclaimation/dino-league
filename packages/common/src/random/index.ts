//
//  random.ts
//  dino-league
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { fill } from "../array/fill";

/**
 * Random functions arguments
 *
 * @param start The start value (inclusive)
 * @param end The end value (exclusive)
 */
export type RandomArgs = {
  /** The start value (inclusive) */
  start?: number;
  /** The end value (exclusive) */
  end: number;
};

/**
 * Generate a random integer
 * @param args The ranges argument
 * @returns A random integer between start..<end
 */
export const randomInt = (args: RandomArgs) => Math.floor(random(args));

/**
 * Generate a random float
 * @param args The ranges argument
 * @returns A random integer between start..<end
 */
export const random = ({ start, end }: RandomArgs) => {
  const begin = start ?? 0;
  return Math.random() * (end - begin) + begin;
};

/**
 * Get a random element from an array
 * @param iter An iterable list / array
 * @returns One random element from the array
 */
export const randomElement = <T>(iter: T[]): T =>
  iter[randomInt({ start: 0, end: iter.length })];

/**
 * Get a weighted random element from an array
 * @param iter An iterable list / array with weight and value
 * @returns One random element from the iterable given their weights
 */
export const weightedRandomElement = <T>(
  iter: { weight: number; value: T }[]
): T =>
  randomElement(iter.flatMap(({ weight, value }) => fill(weight, () => value)));
