//
//  graphql.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import type { Plain } from "@dino/common";
import { Field, ID, InputType, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class Identifiable {
  @Field(() => ID, { description: "A unique ID for this entity" })
  readonly id: string;

  constructor({ id }: Plain<Identifiable>) {
    this.id = id;
  }
}

@InputType()
export class SearchByID {
  @Field(() => ID, { description: "A unique ID for this entity" })
  readonly id!: string;
}
