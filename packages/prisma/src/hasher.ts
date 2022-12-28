//
//  hasher.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import { hash as _hash, verify as _verify } from "argon2";

const __salt__ = Buffer.from(
  process.env["SALT"] ?? "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
);

export const hash = (plain: string) =>
  _hash(plain, {
    salt: __salt__,
  });

export const verify = (hash: string, plain: string) =>
  _verify(hash, plain, {
    salt: __salt__,
  });
