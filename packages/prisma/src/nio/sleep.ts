//
//  sleep.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Dec 2022
//

/**
 * Create a promise that delay an execution by the given amount of time
 * @param ms Time to sleep in milliseconds
 * @returns A promise to that can be awaited to create the delay
 */
export const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
