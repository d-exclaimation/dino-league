//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import {
  fill,
  random,
  randomElement,
  randomInt,
  Values,
  weightedRandomElement,
} from "@dino/common";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import type { Context } from "../context";
import { Arena, Dino } from "../dino/graphql";
import { Battle, BattleEnd, Quest } from "./graphql";

const LEVEL_SCALE = 1.01;
const QuestType = {
  easy: "easy",
  hard: "hard",
  speed: "quickgreens",
  mono: "blandnbold",
  wall: "pinkwall",
  danger: "dangerzone",
} as const;
const ALL_QUEST_CHANCES = [
  { weight: 5, value: QuestType.easy },
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
        where: { userId: user.id },
        select: { dino: true },
        orderBy: { order: "asc" },
      })
    ).map(({ dino }) => Dino.from(dino));
    const enemies = this.randomQuest(party);

    // Mark: Simulate battle
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
              attack: { multiply: LEVEL_SCALE },
              healing: { multiply: LEVEL_SCALE },
              hp: { multiply: LEVEL_SCALE },
              price: { multiply: LEVEL_SCALE },
              speed: { multiply: LEVEL_SCALE },
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

  private simulation(party1: Dino[], party2: Dino[], location: Arena): Battle {
    const battle = new Battle({ plan: [] });

    let [i1, i2] = [0, 0];
    let [mut1, mut2] = [1, 1];

    const yours = () => party1[i1];
    const opponents = () => party2[i2];

    // Mark: -> Init
    battle.init({
      yours: yours(),
      opponents: opponents(),
      yoursRemaining: activeCount(party1),
      opponentsRemaining: activeCount(party2),
    });

    while (true) {
      // Mark: .. -> Init, repeat until no switch is needed
      while (yours().fainted() || opponents().fainted()) {
        i1 += yours().fainted() ? 1 : 0;
        i2 += opponents().fainted() ? 1 : 0;

        // Mark: ... -> End
        if (i1 >= party1.length || i2 >= party2.length) {
          battle.end({ win: i1 < party1.length });
          return battle;
        }

        battle.init({
          yours: yours(),
          opponents: opponents(),
          yoursRemaining: activeCount(party1),
          opponentsRemaining: activeCount(party2),
        });
      }

      // Mark: ... -> Turn
      const yoursSpeed = random({ end: yours().speed * mut1 });
      const opponentsSpeed = random({ end: opponents().speed * mut2 });
      const attacking = yoursSpeed >= opponentsSpeed;

      const damage = (attacking ? yours() : opponents()).damage(location);
      (attacking ? opponents() : yours()).take(damage);
      battle.turn({
        yours: yours(),
        opponents: opponents(),
        attacking,
        damage,
      });

      mut1 = attacking ? Math.max(0.1, mut1 - 0.1) : 1;
      mut2 = !attacking ? Math.max(0.1, mut2 - 0.1) : 1;
    }
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
        return fill(randomInt({ start: 1, end: 6 }), () =>
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

const activeCount = (party: Dino[]) =>
  party.filter((dino) => !dino.fainted()).length;
