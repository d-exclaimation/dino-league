//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import {
  fill,
  Lib,
  randomElement,
  randomInt,
  Values,
  weightedRandomElement,
} from "@dino/common";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import type { Context } from "../context";
import { Dino } from "../dino/graphql";
import { Battle, BattleEnd, Quest } from "./graphql";

const QuestType = {
  easy: "easy",
  hard: "hard",
  speed: "quickgreens",
  mono: "blandnbold",
  wall: "pinkwall",
  danger: "dangerzone",
} as const;
const ALL_QUEST_CHANCES = [
  { weight: 10, value: QuestType.easy },
  { weight: 1, value: QuestType.hard },
  { weight: 1, value: QuestType.speed },
  { weight: 1, value: QuestType.mono },
  { weight: 1, value: QuestType.wall },
  { weight: 1, value: QuestType.danger },
];
export type QuestType = Values<typeof QuestType>;

@Resolver()
export class BattleResolver {
  @Mutation(() => Quest, {
    description: "Start a random quest",
  })
  async quest(@Ctx() { prisma, user }: Context): Promise<Quest> {
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
    const enemies = this.randomQuest(party);

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
              price: { multiply: Lib.LEVEL_SCALE },
              speed: { multiply: Lib.LEVEL_SCALE },
              level: { increment: 1 },
            },
            where: { id },
          });
        }

        // TODO: Apply game periodic events
      }
    });

    return battle;
  }

  /**
   * Get a random quest party
   * @param party The player's party to based the randomness of
   * @returns A generated random quest party
   */
  private randomQuest(party: Dino[]) {
    const questType = weightedRandomElement(ALL_QUEST_CHANCES);
    const start = Math.round(
      Math.max(1, Math.min(...party.map(({ level }) => level)))
    );
    const end = Math.round(
      Math.max(start, Math.max(...party.map(({ level }) => level)) * 0.9)
    );

    switch (questType) {
      case "easy":
        return fill(randomInt({ start: 1, end: party.length }), () =>
          Dino.random({
            start: 1,
            end: Math.min(start * 1.25, end),
          })
        );
      case "hard":
        return fill(randomInt({ start: 4, end: 6 }), () =>
          Dino.random({
            start: Math.max(start, end / 2),
            end: end,
          })
        );
      case "quickgreens":
        return fill(6, () => Dino.variantRandom("green", { start, end }));
      case "blandnbold":
        return fill(6, () =>
          Dino.variantRandom(randomElement(["black", "blue", "white"]), {
            start,
            end,
          })
        );
      case "pinkwall":
        return fill(6, () =>
          Dino.variantRandom("pink", {
            start,
            end,
          })
        );
      case "dangerzone":
        return fill(6, () =>
          Dino.variantRandom(randomElement(["slate", "red"]), {
            start,
            end,
          })
        );
    }
  }
}
