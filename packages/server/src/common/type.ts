//
//  type.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Nov 2022
//

import { objectType } from "nexus";

export const UnauthorizedType = objectType({
  name: "Unauthorized",
  description: "An operation is made by an unauthorized user",
  definition(t) {
    t.nonNull.string("operation", {
      description: "What operation is done that caused an unauthorized error",
    });
  },
});
