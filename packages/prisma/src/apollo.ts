//
//  apollo.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { ApolloServerPlugin, BaseContext } from "@apollo/server";
import { Prisma, PrismaClient } from "@prisma/client";

/**
 * Gracefully start and shutdown prisma
 * @param client Prisma client to be shutdown
 * @returns A ApolloServer plugin that gracefully start and shutdown prism
 */
export const ApolloServerPrismaPlugin = <
  Context extends BaseContext,
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
      : never
    : never,
  G extends
    | Prisma.RejectOnNotFound
    | Prisma.RejectPerOperation
    | false
    | undefined = "rejectOnNotFound" extends keyof T
    ? T["rejectOnNotFound"]
    : false
>(
  client: PrismaClient<T, U, G>
): ApolloServerPlugin<Context> => ({
  serverWillStart: async () => {
    await client.$connect();
    return {
      serverWillStop: async () => {
        await client.$disconnect();
      },
    };
  },
});
