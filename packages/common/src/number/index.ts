//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

export { clamp } from "@d-exclaimation/common";

type Repeat<Reps, T = true, Acc extends T[] = []> = Reps extends number
  ? Acc["length"] extends Reps
    ? Acc
    : Repeat<Reps, T, [...Acc, T]>
  : never;

type Add<T extends any[], Start = 0> = T extends [infer Head, ...infer Tail]
  ? Add<Tail, [...Repeat<Start>, ...Repeat<Head>]>
  : Start;

/**
 * Add a number to an array of numbers
 * @param start The initial number to add
 * @param values The array of numbers
 * @returns The sum
 */
export function add<K extends number, T extends number[]>(
  start: K,
  ...values: T
): Add<T, K> {
  return sum([start, ...values]) as Add<T, K>;
}

/**
 * Sum an array of numbers
 * @param values The array of numbers
 * @returns The sum
 */
export function sum(values: number[]): number {
  return values.reduce((acc, curr) => acc + curr, 0);
}
