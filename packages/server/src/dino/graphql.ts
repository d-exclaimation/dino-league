//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { PropsOf, random } from "@dino/common";
import { Dino as _Dino, DinoLib } from "@dino/prisma";
import {
  Arg,
  createUnionType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { Unauthorized } from "../common/graphql";
import { Identifiable } from "../identifiable/graphql";

@ObjectType({ implements: Identifiable })
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

  constructor({ id, ...rest }: PropsOf<Dino>) {
    super(id);
    Object.assign(this, rest);
  }

  static new({ variant, arena, ...props }: _Dino) {
    return new Dino({
      variant: Variant[variant],
      arena: Arena[arena],
      ...props,
    });
  }

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
}

export enum Variant {
  blue = "blue",
  black = "black",
  green = "green",
  pink = "pink",
  red = "red",
  slate = "slate",
  white = "white",
  yellow = "yellow",
}

registerEnumType(Variant, {
  name: "Variant",
  description: "The variant of dinosaur",
  valuesConfig: {
    blue: { description: "Jumping expert" },
    black: { description: "Bold comes in black" },
    green: { description: "Runs swiftly" },
    pink: { description: "Ouch.." },
    red: {
      description: "A good offense in the best defense",
    },
    slate: { description: "Boom" },
    white: { description: "Jack of all trades" },
    yellow: {
      description: "Can't lose if you don't get hit",
    },
  },
});

export enum Arena {
  GRASSLAND = "GRASSLAND",
  HILLS = "HILLS",
  OCEAN = "OCEAN",
  URBAN = "URBAN",
  DESERT = "DESERT",
}

registerEnumType(Arena, {
  name: "Arena",
  description: "The battlefield environment",
});

@ObjectType({ description: "New Dino has been created" })
export class NewDino {
  @Field(() => Dino, { description: "The new Dino created" })
  dino: Dino;

  constructor(dino: Dino) {
    this.dino = dino;
  }
}

export type CreateDino = typeof CreateDino;
export const CreateDino = createUnionType({
  name: "CreateDino",
  description: "Create Dino mutation result",
  types: () => [Unauthorized, NewDino],
  resolveType(source) {
    if ("dino" in source) {
      return "NewDino";
    }
    return "Unauthorized";
  },
});

@InputType({
  description: "Filter argument(s) for Dino(s)",
})
export class DinoFilter {
  @Field(() => Variant, {
    nullable: true,
    description: "The variant of one or many Dino(s)",
  })
  variant?: Variant;

  @Field(() => Arena, {
    nullable: true,

    description: "The arena of choice of one or many Dino(s)",
  })
  arena?: Arena;

  @Field(() => Int, {
    description: "The limit of result to take",
    defaultValue: 20,
  })
  take!: number;
}

@InputType({
  description: "Filter argument(s) for Dino(s)",
})
export class DinoCreate {
  @Field(() => Variant, {
    description: "The variant of one or many Dino(s)",
  })
  variant!: Variant;

  @Field(() => String, {
    nullable: true,
    description: "The name of this Dinosaur",
  })
  name?: string;

  @Field(() => Int, {
    description:
      "The current level of this Dinosaur, which affects its attack and HP",
  })
  level!: number;
}
