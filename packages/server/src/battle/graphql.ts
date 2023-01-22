//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { random, Struct } from "@dino/common";
import { createUnionType, Field, ObjectType } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import { Arena, Dino } from "../dino/graphql";

@ObjectType({
  description: "Initial battle information",
})
export class BattleInit {
  @Field({
    description: "The current details of your battling dino",
  })
  yours: Dino;

  @Field({
    description: "The current details of opponent's battling dino",
  })
  opponents: Dino;

  @Field({
    description: "The number of yours dino",
  })
  yoursRemaining: number;

  @Field({
    description: "The number of opponent's dino",
  })
  opponentsRemaining: number;

  constructor({
    yours,
    opponents,
    yoursRemaining,
    opponentsRemaining,
  }: Struct.infer<BattleInit>) {
    this.yours = yours.clone();
    this.opponents = opponents.clone();
    this.yoursRemaining = yoursRemaining;
    this.opponentsRemaining = opponentsRemaining;
  }
}

@ObjectType({
  description: "Turn information",
})
export class BattleTurn {
  @Field({
    description: "True if your dino is attacking, false otherwise",
  })
  attacking: boolean;

  @Field({
    description: "The current details of your battling dino",
  })
  yours: Dino;

  @Field({
    description: "The current details of opponent's battling dino",
  })
  opponents: Dino;

  @Field({
    description: "The damage being dealt",
  })
  damage: number;

  constructor({
    yours,
    opponents,
    damage,
    attacking,
  }: Struct.infer<BattleTurn>) {
    this.yours = yours.clone();
    this.opponents = opponents.clone();
    this.damage = damage;
    this.attacking = attacking;
  }
}

@ObjectType({
  description: "Battle ending",
})
export class BattleEnd {
  @Field({
    description: "Whether you win or not",
  })
  win: boolean;

  constructor({ win }: Struct.infer<BattleEnd>) {
    this.win = win;
  }
}

export type BattleInfo = typeof BattleInfo;
export const BattleInfo = createUnionType({
  name: "BattleInfo",
  description: "Battle information",
  types: () => [BattleInit, BattleTurn, BattleEnd],
  resolveType(source) {
    return "win" in source
      ? "BattleEnd"
      : "attacking" in source
      ? "BattleTurn"
      : "BattleInit";
  },
});

@ObjectType({
  description: "Battle result and plan",
})
export class Battle {
  @Field(() => [BattleInfo], {
    description: "Battle plan information",
  })
  plan: BattleInfo[];

  constructor({ plan }: Struct.infer<Battle>) {
    this.plan = plan;
  }

  init(args: Struct.infer<BattleInit>) {
    this.plan.push(new BattleInit(args));
  }

  turn(args: Struct.infer<BattleTurn>) {
    this.plan.push(new BattleTurn(args));
  }

  end(args: Struct.infer<BattleEnd>) {
    this.plan.push(new BattleEnd(args));
  }

  /**
   * Simulated a battle and its plan according to the 2 parties involved
   * @param prisma
   * @param lhs
   * @param rhs
   * @param location
   */
  static simulated(lhs: Dino[], rhs: Dino[], location: Arena) {
    const battle = new Battle({ plan: [] });

    let [i1, i2] = [0, 0];
    let [mut1, mut2] = [1, 1];

    const left = () => lhs[i1];
    const right = () => rhs[i2];

    // Mark: -> Init
    battle.init({
      yours: left(),
      opponents: right(),
      yoursRemaining: lhs.filter((dino) => !dino.fainted()).length,
      opponentsRemaining: rhs.filter((dino) => !dino.fainted()).length,
    });

    while (true) {
      // Mark: .. -> Init, repeat until no switch is needed
      while (left().fainted() || right().fainted()) {
        i1 += left().fainted() ? 1 : 0;
        i2 += right().fainted() ? 1 : 0;

        // Mark: ... -> End
        if (i1 >= lhs.length || i2 >= rhs.length) {
          battle.end({ win: i1 < lhs.length });
          return battle;
        }

        battle.init({
          yours: left(),
          opponents: right(),
          yoursRemaining: lhs.filter((dino) => !dino.fainted()).length,
          opponentsRemaining: rhs.filter((dino) => !dino.fainted()).length,
        });
      }

      // Mark: ... -> Turn
      const yoursSpeed = random({ end: left().speed * mut1 });
      const opponentsSpeed = random({ end: right().speed * mut2 });
      const attacking = yoursSpeed >= opponentsSpeed;

      const damage = (attacking ? left() : right()).damage(location);
      (attacking ? right() : left()).take(damage);
      battle.turn({
        yours: left(),
        opponents: right(),
        attacking,
        damage,
      });

      mut1 = attacking ? Math.max(0.1, mut1 - 0.1) : 1;
      mut2 = !attacking ? Math.max(0.1, mut2 - 0.1) : 1;
    }
  }
}

export type Quest = typeof Quest;
export const Quest = createUnionType({
  name: "Quest",
  description: "Quest results",
  types: () => [Unauthorized, Battle],
  resolveType(source) {
    return "plan" in source ? "Battle" : "Unauthorized";
  },
});
