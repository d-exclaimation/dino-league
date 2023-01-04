//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 04 Jan 2023
//

import { Struct } from "@dino/common";
import { createUnionType, Field, ObjectType } from "type-graphql";
import { Unauthorized } from "../common/graphql";
import { Dino } from "../dino/graphql";

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
    description: "The number of opponent's dino",
  })
  count: number;

  constructor({ yours, opponents, count }: Struct.infer<BattleInit>) {
    this.yours = yours.clone();
    this.opponents = opponents.clone();
    this.count = count;
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
