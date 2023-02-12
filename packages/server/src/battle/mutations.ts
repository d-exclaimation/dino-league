//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { Lib, weightedRandomElement } from "@dino/common";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import type { Context } from "../context";
import { Dino } from "../dino/graphql";
import { Battle, BattleEnd, Quest } from "./graphql";
import { randomQuest } from "./quest";

@Resolver()
export class BattleResolver {
  @Mutation(() => Quest, {
    description: "Start a random quest",
  })
  async quest(@Ctx() { prisma, user, logger }: Context): Promise<Quest> {
    if (!user) {
      return new Unauthorized({ operation: "quest" });
    }

    // Mark: Setup
    const party = (
      await prisma.party.findMany({
        where: { userId: user.id, dino: { hp: { gt: 0 } } },
        select: { dino: true },
        orderBy: { order: "asc" },
      })
    ).map(({ dino }) => Dino.from(dino));
    const { enemies, meta } = randomQuest({
      size: party.length,
      level: {
        min: Math.min(...party.map(({ level }) => level)),
        max: Math.max(...party.map(({ level }) => level)),
        avg: Math.round(
          party.map(({ level }) => level).reduce((acc, x) => acc + x, 0) /
            party.length
        ),
      },
    });

    logger
      .scope("quest")
      .info(
        `Quest(${meta.type}, d: ${meta.difficulty}) played by User(${user.id})`
      );

    // Mark: Simulate battle
    if (party.length <= 0) {
      return new Battle({ plan: [new BattleEnd({ win: false })] });
    }
    const battle = Battle.simulated(party, enemies, user.location);

    // Mark: Compute data from outcome
    const isWin = (battle.plan.at(-1) as BattleEnd | undefined)?.win ?? false;
    const levels = {
      party: party.map(({ level }) => level).reduce((acc, x) => acc + x, 0),
      enemy: enemies.map(({ level }) => level).reduce((acc, x) => acc + x, 0),
    };
    const chances = [
      { weight: levels.party * (isWin ? 1 : 2), value: false },
      { weight: levels.enemy, value: true },
    ];

    await prisma.$transaction(async (tx) => {
      // Mark: Record battle history
      await tx.history.create({
        data: { isWin, userId: user.id, isQuest: true },
        select: { id: true },
      });

      // Mark: Earn cash
      if (isWin) {
        await tx.user.update({
          data: {
            cash: {
              increment: Math.round(
                enemies.map(({ price }) => price).reduce((acc, x) => acc + x, 0)
              ),
            },
          },
          where: {
            id: user.id,
          },
        });
      }

      // Mark: Healing and/or level up
      for (const dino of party) {
        const { hp, healing, id } = dino;
        const healed = Math.min(dino.maxHp(), hp + healing);

        // Healed HP changes
        await tx.dino.update({
          data: { hp: dino.fainted() ? 0 : healed },
          where: { id },
        });

        // Level up
        if (!dino.fainted() && weightedRandomElement(chances)) {
          await tx.dino.update({
            data: {
              attack: { multiply: Lib.LEVEL_SCALE },
              healing: { multiply: Lib.LEVEL_SCALE },
              hp: { multiply: Lib.LEVEL_SCALE },
              price: Math.round(Lib.LEVEL_SCALE * dino.price),
              speed: { multiply: Lib.LEVEL_SCALE },
              level: { increment: 1 },
            },
            where: { id },
          });
        }

        // TODO: Apply game periodic events
      }

      // TODO: Show events through this
      return "";
    });

    return battle;
  }
}
