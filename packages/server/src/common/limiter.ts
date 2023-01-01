//
//  limiter.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import { clamp } from "@dino/common";
import { createMethodDecorator } from "type-graphql";
import type { Context } from "../context";

class Imprints extends Map<string, Date> {
  verify(ip: string, maxDiff: number): boolean {
    const curr = new Date();
    const prev = this.get(ip);

    this.set(ip, curr);

    if (!prev) {
      return false;
    }

    return curr.getTime() - prev.getTime() >= maxDiff;
  }
}

const imprints = new Imprints();

/**
 * Rate limit a resolver
 * @param rps Requests allowed per second
 */
export function RateLimit(rps: number = 100) {
  const maxTime = Math.round(1000 / clamp(rps, { min: 0, max: 1000 }));
  return createMethodDecorator<Context>(
    ({ info, context: { req, logger } }, next) => {
      if (!imprints.verify(req.ip, maxTime)) {
        logger
          .under(info.operation, req.ip)
          .warn(`ip: ${req.ip} is making too many requests`);
        throw new Error("Try again later");
      }
      return next();
    }
  );
}
