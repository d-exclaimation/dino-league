//
//  abstracts.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import type { Plain } from "@dino/common";
import { createUnionType, Field, ObjectType } from "type-graphql";
import { Unauthorized } from "../../common/graphql";
import { User } from "./type";

@ObjectType({
  description: "User credentials",
})
export class Credentials {
  @Field(() => User, {
    description: "User information",
  })
  user: User;

  @Field({
    description: "Token for this user",
  })
  token: string;

  constructor({ token, user }: Plain<Credentials>) {
    this.user = user;
    this.token = token;
  }
}

export type Login = typeof Login;
export const Login = createUnionType({
  name: "Login",
  description: "Login result",
  types: () => [Unauthorized, Credentials],
  resolveType(source) {
    return "user" in source ? "Credentials" : "Unauthorized";
  },
});

@ObjectType({
  description: "Email is not unique or valid",
})
export class InvalidEmail {
  @Field({
    description: "Reason of problem",
  })
  reason: string;

  constructor({ reason }: Plain<InvalidEmail>) {
    this.reason = reason;
  }
}

export type Signup = typeof Signup;
export const Signup = createUnionType({
  name: "Signup",
  description: "Sign up result",
  types: () => [Credentials, InvalidEmail],
  resolveType(source) {
    return "user" in source ? "Credentials" : "InvalidEmail";
  },
});
