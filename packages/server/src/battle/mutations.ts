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
import { Arena, Dino } from "../dino/graphql";
import { Battle, Quest } from "./graphql";

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

    const minLevel = Math.max(
      1,
      Math.min(...party.map(({ level }) => level)) * 0.8
    );
    const maxLevel = Math.max(
      minLevel,
      Math.max(...party.map(({ level }) => level)) * 0.8
    );

    // TODO: Better quest variants
    const enemies = fill(randomInt({ start: 1, end: 6 }), () =>
      Dino.random({ start: minLevel, end: maxLevel })
    );

    // TODO: Apply final result
    // // MARK: Healing
    // await prisma.$transaction(
    //   party
    //     .map((dino) => ({
    //       id: dino.id,
    //       hp: dino.fainted()
    //         ? 0
    //         : Math.min(dino.maxHp(), dino.hp + dino.healing),
    //     }))
    //     .map(({ id, hp }) =>
    //       prisma.dino.update({ where: { id }, data: { hp } })
    //     )
    // );
    // // TODO: Leveling up
    // // TODO: Periodic game events

    return this.simulation(party, enemies, user.location);
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
}

const activeCount = (party: Dino[]) =>
  party.filter((dino) => !dino.fainted()).length;
