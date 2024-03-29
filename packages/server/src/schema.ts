//
//  schema.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { join } from "path";
import { buildSchema } from "type-graphql";
import { BattleResolver } from "./battle/mutations";
import { __prod__ } from "./constant/artifacts";
import { DinoMutations } from "./dino/mutations";
import { DinoQueries } from "./dino/queries";
import { ItemMutations } from "./item/mutations";
import { UserMutations } from "./user/mutations";
import { UserQueries } from "./user/queries";

export const createSchema = async () =>
  buildSchema({
    resolvers: [
      DinoQueries,
      DinoMutations,
      UserQueries,
      UserMutations,
      BattleResolver,
      ItemMutations,
    ],
    validate: false,
    emitSchemaFile: !__prod__
      ? {
          path: join(__dirname, "../schema.gql"),
          sortedSchema: false, // by default the printed schema is sorted alphabetically
        }
      : undefined,
  });
