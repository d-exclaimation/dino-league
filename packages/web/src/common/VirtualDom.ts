//
//  VirtualDom.ts
//  dino-league
//
//  Created by d-exclaimation on 01 Jan 2023
//

/**
 * Run an action at the beginning of the next event loop (after state changes)
 * @param action Action to be registered
 */
export const nextLoop = (action: () => void) => setTimeout(action, 0);
