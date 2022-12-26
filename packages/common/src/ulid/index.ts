//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Dec 2022
//

import { ulid as _ulid } from "ulid";

/**
 * Create a unique identifier using the ULID algorithms
 */
export const ulid = (prefix?: string) =>
  `${prefix ?? ""}${_ulid().toLowerCase()}`;
