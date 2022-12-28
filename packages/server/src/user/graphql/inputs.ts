//
//  inputs.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import { Field, InputType } from "type-graphql";

@InputType({
  description: "Information required for login",
})
export class LoginInfo {
  @Field({
    description: "A unique email for the user",
  })
  email!: string;

  @Field({
    description: "Password to log in",
  })
  password!: string;
}

@InputType({
  description: "Information required to create a new user",
})
export class SigningUp {
  @Field({
    nullable: true,
    description: "A username tied to this email",
  })
  username?: string;

  @Field({
    description: "A unique email for the user",
  })
  email!: string;

  @Field({
    description:
      "Password to signing up, will be hashed and not stored as plain text",
  })
  password!: string;
}
