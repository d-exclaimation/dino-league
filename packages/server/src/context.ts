//
//  context.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { PrismaStorage } from "@dino/prisma";

export type Context = {
  prisma: PrismaStorage;
};