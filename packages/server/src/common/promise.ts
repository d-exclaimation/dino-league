//
//  promise.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Dec 2022
//

/**
 * Create a delay using a promise
 */
export const sleep = (ms: number) =>
  new Promise<void>((r) => setTimeout(r, ms));
