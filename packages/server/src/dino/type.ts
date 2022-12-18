//
//  type.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { enumType, objectType, unionType } from "nexus";

export const DinoType = objectType({
  name: "Dino",
  definition(t) {
    t.implements("Identifiable");

    t.nonNull.string("name", {
      description: "The name of this Dinosaur",
    });

    t.nonNull.field("variant", {
      type: "Variant",
      description: "The variance for this Dinosaur",
    });

    t.nonNull.int("level", {
      description:
        "The current level of this Dinosaur, which affects its attack and HP",
    });

    t.nonNull.float("hp", {
      description: "The current health of this Dinosaur",
    });

    t.nonNull.float("attack", {
      description: "The attack for this class of Dinosaur",
    });

    t.nonNull.float("speed", {
      description: "The speed for this class of Dinosaur",
    });

    t.nonNull.float("healing", {
      description:
        "The amount of healing this class Dinosaur gain when resting",
    });

    t.nonNull.field("arena", {
      type: "Arena",
      description: "The arena environment this Dinosaur most effective in",
    });
  },
});

export const VariantType = enumType({
  name: "Variant",
  description: "The variant of dinosaur",
  members: [
    { name: "blue", value: "blue", description: "Jumping expert" },
    { name: "black", value: "black", description: "Bold comes in black" },
    { name: "green", value: "green", description: "Runs swiftly" },
    { name: "pink", value: "pink", description: "Ouch.." },
    {
      name: "red",
      value: "red",
      description: "A good offense in the best defense",
    },
    { name: "slate", value: "slate", description: "Boom" },
    { name: "white", value: "white", description: "Jack of all trades" },
    {
      name: "yellow",
      value: "yellow",
      description: "Can't lose if you don't get hit",
    },
  ],
});

export const ArenaType = enumType({
  name: "Arena",
  description: "The battlefield environment",
  members: ["GRASSLAND", "HILLS", "OCEAN", "URBAN", "DESERT"],
});

export const NewDinoType = objectType({
  name: "NewDino",
  description: "New Dino has been created",
  definition(t) {
    t.nonNull.field("dino", {
      type: "Dino",
      description: "The new Dino created",
    });
  },
});

export const CreateDinoType = unionType({
  name: "CreateDino",
  description: "Create Dino mutation result",
  definition(t) {
    t.members("Unauthorized", "NewDino");
  },
  resolveType(source) {
    if ("dino" in source) {
      return "NewDino";
    }
    return "Unauthorized";
  },
});
