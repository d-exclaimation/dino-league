//
//  type.ts
//  dino-league
//
//  Created by d-exclaimation on 18 Dec 2022
//

import { objectType } from "nexus";

export const UserType = objectType({
  name: "User",
  definition(t) {
    t.implements("Identifiable");
  },
});
