//
//  schema.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { makeSchema } from "nexus";
import { join } from "path";
import { __prod__ } from "./constant/artifacts";
import * as types from "./types";

export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: !__prod__,
  outputs: {
    typegen: join(__dirname, "./nexus/index.ts"),
    schema: join(__dirname, "./nexus/schema.graphql"),
  },
  contextType: {
    module: join(__dirname, "./context.ts"),
    export: "Context",
  },
});
