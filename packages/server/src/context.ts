//
//  context.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { PrismaStorage } from "@dino/prisma";
import { Logger } from "./logger";
import { User } from "./user/graphql";

export type Context = {
  prisma: PrismaStorage;
  logger: Logger;
  user?: User;
};
