//
//  logger.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Dec 2022
//

import { ulid } from "@dino/common";
import {
  PrismaEngineError,
  PrismaKnownError,
  PrismaUnknownError,
} from "@dino/prisma";
import { Signale, SignaleOptions } from "signale";

/**
 * Custom logger
 */
export class Logger extends Signale {
  public override scope(...name: string[]) {
    return super.scope(...name);
  }

  /**
   * Logging for custom known errors
   * @param e Error thrown from a try-catch block
   * @param scope Scope where this log is sent to
   */
  public customError(e: unknown, scope: string) {
    const logger = this.scope(scope);
    if (e instanceof PrismaKnownError) {
      logger.warn(e.message.trim());
    } else if (e instanceof PrismaUnknownError) {
      logger.error(e.message.trim());
    } else if (e instanceof PrismaEngineError) {
      logger.fatal(e.message.trim());
    } else {
      logger.fatal(e);
    }
  }

  /**
   * Trace an action using the logger
   * @param action The action to be trace against
   */
  public async trace<ReturnType>(
    options: { scope: string; id?: boolean; start?: boolean },
    action: () => Promise<ReturnType>
  ): Promise<ReturnType> {
    const { id: withId, start: withStart, scope } = options;
    const suffix = withId ? `(${ulid()})` : undefined;
    const start = Date.now();
    const logger = this.scope(scope);

    if (withStart) {
      logger.pending({ message: "Trace started", suffix });
    }

    try {
      return await action();
    } catch (e) {
      throw e;
    } finally {
      logger.complete({
        message: `Trace completed in ${(Date.now() - start).toPrecision(2)}ms`,
        suffix,
      });
    }
  }
}

/**
 * Create a custom logger given the environment
 * @param options Logger options
 * @returns A new logger
 */
export const createLogger = (
  options: Omit<SignaleOptions, "logLevel" | "types">
): Logger => new Logger({ ...options });
