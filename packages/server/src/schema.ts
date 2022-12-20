//
//  schema.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { buildSchema } from "type-graphql";
import { DinoMutations } from "./dino/mutations";
import { DinoQueries } from "./dino/queries";
import { UserQueries } from "./user/queries";

export const createSchema = async () =>
  buildSchema({
    resolvers: [DinoQueries, DinoMutations, UserQueries],
    validate: false,
  });
