//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Struct } from "@dino/common";
import { createUnionType, Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "An operation is made by an unauthorized user",
})
export class Unauthorized {
  @Field({
    description: "What operation is done that caused an unauthorized error",
  })
  operation: string;

  constructor({ operation }: Struct.infer<Unauthorized>) {
    this.operation = operation;
  }
}

@ObjectType({
  description: "One of the input violates a constraint",
})
export class InputConstraint {
  @Field({
    description: "The field name that is violating constraint",
  })
  name: string;

  @Field({
    description: "The reason of violation",
  })
  reason: string;

  constructor({ name, reason }: Struct.infer<InputConstraint>) {
    this.name = name;
    this.reason = reason;
  }
}

@ObjectType({
  description:
    "Indicator that an operation has done successfully something or not",
})
export class Indicator {
  @Field({
    description:
      "An indicator flag, true for something did happen, false otherwise",
  })
  flag: boolean;

  constructor({ flag }: Struct.infer<Indicator>) {
    this.flag = flag;
  }
}

@ObjectType({
  description: "An operation is blocked to lack of funds",
})
export class Underfunded {
  @Field({
    description: "Money owned",
  })
  owned: number;

  @Field({
    description: "Money require",
  })
  required: number;

  constructor({ owned, required }: Struct.infer<Underfunded>) {
    this.owned = owned;
    this.required = required;
  }
}

export type AuthIndicator = typeof AuthIndicator;
export const AuthIndicator = createUnionType({
  name: "AuthIndicatorReply",
  description: "Indicated reply that require authentication",
  types: () => [Unauthorized, Indicator, InputConstraint],
  resolveType(source) {
    return "flag" in source
      ? "Indicator"
      : "reason" in source
      ? "InputConstraint"
      : "Unauthorized";
  },
});
