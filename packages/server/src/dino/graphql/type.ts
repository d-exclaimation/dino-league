//
//  type.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Dec 2022
//

import { random, randomElement, randomInt, Struct, ulid } from "@dino/common";
import { Dino as _Dino, DinoLib } from "@dino/prisma";
import { Arg, Field, Float, Int, ObjectType } from "type-graphql";
import { Identifiable } from "../../identifiable/graphql";
import { Arena, Variant } from "./others";

@ObjectType({ implements: Identifiable, description: "A dinosaur" })
export class Dino extends Identifiable {
  @Field({ description: "The name of this Dinosaur" })
  name!: string;

  @Field(() => Variant, {
    description: "The variance for this Dinosaur",
  })
  variant!: Variant;

  @Field(() => Int, {
    description:
      "The current level of this Dinosaur, which affects its attack and HP",
  })
  level!: number;

  @Field(() => Float, {
    description: "The current health of this Dinosaur",
  })
  hp!: number;

  @Field(() => Float, {
    description: "The attack for this class of Dinosaur",
  })
  attack!: number;

  @Field(() => Float, {
    description: "The speed for this class of Dinosaur",
  })
  speed!: number;

  @Field(() => Float, {
    description: "The amount of healing this class Dinosaur gain when resting",
  })
  healing!: number;

  @Field(() => Float, {
    description: "The price of this dinosaur",
  })
  price!: number;

  @Field(() => Arena, {
    description: "The arena environment this Dinosaur most effective in",
  })
  arena!: Arena;

  @Field(() => Float, {
    description: "The damage dealt by this Dinosaur",
  })
  damage(@Arg("arena", () => Arena) arena: Arena): number {
    const boost = arena === this.arena ? 1.5 : 1;
    const base = this.attack * boost;
    return random({ start: this.attack, end: base });
  }

  @Field(() => Float, {
    description: "The max hp of this Dinosaur",
  })
  maxHp(): number {
    const scale = Math.pow(1.01, this.level - 1);
    return DinoLib.variants[this.variant].hp * scale;
  }

  @Field(() => Float, {
    description: "The hp percentage of this Dinosaur",
  })
  percentage(): number {
    return Math.round((this.hp * 100) / this.maxHp());
  }

  constructor({ id, ...rest }: Struct.infer<Dino>) {
    super({ id });
    Object.assign(this, rest);
  }

  static from({ variant, arena, ...props }: _Dino) {
    return new Dino({
      variant: Variant[variant],
      arena: Arena[arena],
      ...props,
    });
  }

  static random(args: Parameters<typeof randomInt>[0]) {
    const level = randomInt(args);
    const defaults = DinoLib.variants[randomElement(DinoLib.ALL_VARIANTS)];
    const { variant, arena, ...props } = DinoLib.adjusted(defaults, level);

    return new Dino({
      id: ulid(),
      name: variant,
      level,
      variant: Variant[variant],
      arena: Arena[arena],
      ...props,
    });
  }

  take(dmg: number) {
    this.hp = Math.max(0, this.hp - dmg);
  }

  fainted() {
    return this.hp <= 0;
  }

  clone(): Dino {
    return new Dino({ ...this });
  }
}
