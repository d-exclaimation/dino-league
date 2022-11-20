//
//  client.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { Prisma, PrismaClient } from "@prisma/client";

export const createPrisma = <
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
      : never
    : never,
  GlobalReject extends
    | Prisma.RejectOnNotFound
    | Prisma.RejectPerOperation
    | false
    | undefined = "rejectOnNotFound" extends keyof T
    ? T["rejectOnNotFound"]
    : false
>(
  optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>
) => new PrismaStorage<T, U, GlobalReject>(optionsArg);

/**
 * Wrapper around PrismaClient
 */
export class PrismaStorage<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
      : never
    : never,
  GlobalReject extends
    | Prisma.RejectOnNotFound
    | Prisma.RejectPerOperation
    | false
    | undefined = "rejectOnNotFound" extends keyof T
    ? T["rejectOnNotFound"]
    : false
> extends PrismaClient<T, U, GlobalReject> {}
