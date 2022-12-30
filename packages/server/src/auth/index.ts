//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 30 Dec 2022
//

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { __jwt_secret__ } from "../constant/artifacts";

const ENCODED_SECRET = new TextEncoder().encode(__jwt_secret__);
const JWT_ALG = "HS256";
const ISSUER = "dino:node:server";
const AUDIENCE = {
  WEB: "dino:web:client",
};

/**
 * Sign a JWT payload
 * @param payload JWT payload
 * @returns Signed JWT
 */
export async function sign<T extends JWTPayload>(payload: T) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE.WEB)
    .setExpirationTime("7d")
    .sign(ENCODED_SECRET);
}

/**
 * Verify and parse payload from JWT token
 * @param token Signed JWT token
 * @returns Verified payload if any
 */
export async function verify<T extends JWTPayload>(token: string) {
  try {
    const { payload } = await jwtVerify(token, ENCODED_SECRET, {
      audience: AUDIENCE.WEB,
      issuer: ISSUER,
      algorithms: [JWT_ALG],
    });

    return payload as T;
  } catch {
    return null;
  }
}
