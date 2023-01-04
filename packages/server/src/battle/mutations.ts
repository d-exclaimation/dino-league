//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { fill, random, randomInt } from "@dino/common";
import { Ctx, Mutation, Resolver } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import type { Context } from "../context";
import { Dino } from "../dino/graphql";
import { Battle, Quest } from "./graphql";

@Resolver()
export class BattleResolver {
  @Mutation(() => Quest)
  async quest(@Ctx() { prisma, user }: Context): Promise<Quest> {
    if (!user) {
      return new Unauthorized({ operation: "quest" });
    }

    // Mark: Setup
    const party = await prisma.party
      .findMany({
        where: { userId: user.id },
        select: { dino: true },
        orderBy: { order: "asc" },
      })
      .then((values) => values.map(({ dino }) => Dino.from(dino)));
    const minLevel = Math.min(...party.map(({ level }) => level));
    const maxLevel = Math.max(
      minLevel,
      Math.max(...party.map(({ level }) => level)) * 0.8
    );
    const enemies = fill(randomInt({ start: 1, end: 6 }), () =>
      Dino.random({ start: minLevel, end: maxLevel })
    );

    // Mark: Initial
    let [lhs, rhs] = [0, 0];
    const battle = new Battle({ plan: [] });
    battle.init({
      yours: party[lhs],
      opponents: enemies[rhs],
      count: enemies.length,
    });

    // Mark: Battling
    while (lhs < party.length && rhs < enemies.length) {
      // Mark: Game decision
      const yours = party[lhs];
      const opponents = enemies[rhs];
      const attacking =
        random({ start: 0, end: yours.speed }) >=
        random({ start: 0, end: opponents.speed });

      // Mark: Attack and defending
      const attacker = attacking ? yours : opponents;
      const defender = attacking ? opponents : yours;
      const damage = attacker.damage(user.location);
      defender.take(damage);
      battle.turn({ attacking, yours, opponents, damage });

      // Mark: Switching
      lhs = lhs + (yours.fainted() ? 1 : 0);
      rhs = rhs + (opponents.fainted() ? 1 : 0);
    }

    // Mark: End and apply result
    // TODO: Apply result to the database
    battle.end({ win: lhs < party.length });

    return battle;
  }
}
