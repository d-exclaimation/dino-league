//
//  context.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { PrismaStorage } from "@dino/prisma";
import { User } from "./user/graphql";

export type Context = {
  prisma: PrismaStorage;
  user?: User;
};
