//
//  quest.ts
//  dino-league
//
//  Created by d-exclaimation on 10 Feb 2023
//

import { weightedRandomElement } from "@d-exclaimation/common";
import { fill, Lib, randomElement, randomInt, Values } from "@dino/common";
import { Variant } from "@dino/prisma";
import { Dino } from "../dino/graphql";

export type QuestType = Values<typeof Quest.types>;
export type QuestDifficulty = Values<typeof Quest.difficulties>;

export const Quest = {
  types: {
    random: "random",
    green: "green",
    mono: "mono",
    wall: "wall",
    danger: "danger",
  },
  chances: {
    types: {
      random: 3,
      green: 1,
      mono: 1,
      wall: 1,
      danger: 1,
    },
    difficulties: {
      easy: 3,
      hard: 1,
      match: 1,
    },
  },
  difficulties: {
    easy: "easy",
    match: "match",
    hard: "hard",
  },
} as const;

type Args = {
  size: number;
  level: {
    max: number;
    min: number;
    avg: number;
  };
};

const typeChances = Object.entries(Quest.chances.types).map(
  ([key, chance]) => ({
    value: key as QuestType,
    weight: chance,
  })
);
const difficultyChances = Object.entries(Quest.chances.difficulties).map(
  ([key, chance]) => ({
    value: key as QuestDifficulty,
    weight: chance,
  })
);

/**
 * Get a random quest party
 */
export function randomQuest({ size, level }: Args) {
  const type = weightedRandomElement(typeChances);
  const difficulty = weightedRandomElement(difficultyChances);

  const amount = (() => {
    switch (difficulty) {
      case "easy":
        return randomInt({ start: 1, end: size });
      case "hard":
        return randomInt({ start: size, end: 7 });
      case "match":
        return size;
    }
  })();

  const range = (() => {
    switch (difficulty) {
      case "easy":
        return { start: Math.max(1, level.avg - level.min), end: level.avg };
      case "match":
        return { start: level.min, end: level.max + 1 };
      case "hard":
        return { start: level.avg, end: level.max + level.min };
    }
  })();

  const variant = () => {
    switch (type) {
      case "random":
        return randomElement(Lib.ALL_VARIANTS);
      case "green":
        return "green";
      case "mono":
        return randomElement<Variant>(["blue", "white", "black"]);
      case "wall":
        return "pink";
      case "danger":
        return randomElement<Variant>(["slate", "red"]);
    }
  };

  return {
    enemies: fill(amount, () => Dino.variantRandom(variant(), range)),
    meta: {
      difficulty,
      type,
    },
  };
}
