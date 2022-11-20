//
//  type.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { interfaceType } from "nexus";

export const IdentifiableType = interfaceType({
  name: "Identifiable",
  resolveType(_s) {
    return "Dino";
  },
  definition(t) {
    t.nonNull.id("id", { description: "A unique ID for this entity" });
  },
});
