//
//  context.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import type { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import type { PrismaStorage } from "@dino/prisma";
import type { Logger } from "./logger";
import type { User } from "./user/graphql";

export type Context = {
  prisma: PrismaStorage<any, any, any>;
  logger: Logger;
  user?: User;
  req: ExpressContextFunctionArgument["req"];
};
