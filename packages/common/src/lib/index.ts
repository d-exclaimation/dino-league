//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Jan 2023
//

import * as dino from "./dino";
import * as item from "./item";

/**
 * Common lib / source of truth for all dino knowledge
 */
export const Lib = { ...dino, ...item };
