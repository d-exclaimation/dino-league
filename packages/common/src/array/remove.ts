//
//  remove.ts
//  dino-league
//
//  Created by d-exclaimation on 15 Feb 2023
//

/**
 * Remove an element from an array
 * @param arr - Array to remove from
 * @param element - Element to remove
 * @returns Array without the element
 */
export const remove = <T>(arr: T[], element: T): T[] => {
  const index = arr.indexOf(element);
  return arr.filter((_, i) => i !== index);
};

/**
 * Remove the first element that matches a predicate from an array
 * @param arr - Array to remove from
 * @param predicate - Predicate to match
 * @returns Array without the element
 */
export const removeFirst = <T>(
  arr: T[],
  predicate: (arg_0: T) => boolean
): T[] => {
  const index = arr.findIndex(predicate);
  return arr.filter((_, i) => i !== index);
};
