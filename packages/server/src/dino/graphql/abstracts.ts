//
//  abstracts.ts
//  dino-league
//
//  Created by d-exclaimation on 21 Dec 2022
//

import { PropsOf } from "@dino/common";
import { createUnionType, Field, ObjectType } from "type-graphql";
import { Unauthorized } from "../../common/graphql";
import { Dino } from "./type";

@ObjectType({ description: "New Dino has been created" })
export class NewDino {
  @Field(() => Dino, { description: "The new Dino created" })
  dino: Dino;

  constructor({ dino }: PropsOf<NewDino>) {
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
