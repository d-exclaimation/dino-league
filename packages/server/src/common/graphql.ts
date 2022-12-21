//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { PropsOf } from "@dino/common";
import { Field, ObjectType } from "type-graphql";

@ObjectType({
  description: "An operation is made by an unauthorized user",
})
export class Unauthorized {
  @Field({
    description: "What operation is done that caused an unauthorized error",
  })
  operation!: string;

  constructor({ operation }: PropsOf<Unauthorized>) {
    this.operation = operation;
  }
}
