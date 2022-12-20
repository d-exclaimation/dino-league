//
//  schema.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { buildSchema } from "type-graphql";

export const createSchema = async () => buildSchema({ resolvers: [] as any });
