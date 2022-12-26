//
//  client.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { randomElement, randomInt } from "@dino/common";
import { Dino, Prisma, PrismaClient, User, Variant } from "@prisma/client";
import { DinoLib } from "./dino";

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

type CreateDinoArgs = {
  level: number;
  name?: string;
  userId?: User["id"];
};

type CreatePartyArgs = {
  userId: User["id"];
  dinoId: Dino["id"];
  order?: number;
};

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
> extends PrismaClient<T, U, GlobalReject> {
  async addToParty({ dinoId, userId }: CreatePartyArgs) {
    const party = await this.party.findMany({
      where: { userId },
      select: { dinoId: true },
    });

    if (new Set(party.map(({ dinoId }) => dinoId)).has(dinoId)) {
      return;
    }

    return this.party.create({
      data: {
        dinoId,
        userId,
        order: party.length,
      },
    });
  }

  async createDino(variant: Variant, { level, name, userId }: CreateDinoArgs) {
    const props = DinoLib.adjusted(DinoLib.variants[variant], level);
    return this.dino.create({
      data: {
        name: name ?? variant,
        level,
        userId,
        ...props,
      },
    });
  }

  async createRandomDino({ level, ...rest }: CreateDinoArgs) {
    const variant = randomElement(DinoLib.ALL_VARIANTS);
    return this.createDino(variant, {
      level: randomInt({ start: Math.ceil(level / 2), end: level }),
      ...rest,
    });
  }
}
