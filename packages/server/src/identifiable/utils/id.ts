//
//  id.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { v4 } from "uuid";

/**
 * Generate a new ID
 */
export const id = (prefix?: string) => (!!prefix ? `${prefix}#${v4()}` : v4());
