//
//  input.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { inputObjectType } from "nexus";

export const SearchByID = inputObjectType({
  name: "SearchByID",
  description: "Search an Identifiable by the ID",
  definition(t) {
    t.nonNull.id("id", { description: "The ID to be search against" });
  },
});
