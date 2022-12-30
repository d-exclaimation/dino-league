//
//  mutations.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { sign } from "../auth";
import { Unauthorized } from "../common/graphql";
import { RateLimit } from "../common/limiter";
import type { Context } from "../context";
import { Credentials, Login, LoginInfo, User } from "./graphql";

@Resolver()
export class UserMutations {
  @RateLimit(10)
  @Mutation(() => Login, {
    description: "Log into a user with the given credentials",
  })
  async login(
    @Arg("input") { email, password }: LoginInfo,
    @Ctx() { prisma, logger }: Context
  ): Promise<Login> {
    try {
      const res = await prisma.login({ email, password });
      if (!res) {
        return new Unauthorized({ operation: "login" });
      }
      const token = await sign({ id: res });
      return new Credentials({ user: new User({ id: res }), token });
    } catch (e: unknown) {
      logger.customError(e, "login");
      return new Unauthorized({ operation: "login" });
    }
  }
}
