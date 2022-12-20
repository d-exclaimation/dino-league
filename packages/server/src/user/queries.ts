//
//  queries.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Dec 2022
//

import { Ctx, Query, Resolver } from "type-graphql";
import { Context } from "../context";
import { User } from "./graphql";

@Resolver()
export class UserQueries {
  @Query(() => User, {
    nullable: true,
    description: "Get the current authenticated user",
  })
  async me(@Ctx() { user }: Context): Promise<User | undefined> {
    return user ? new User(user.id) : undefined;
  }
}
