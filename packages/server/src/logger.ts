//
//  logger.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Dec 2022
//

import { ApolloServerPlugin, BaseContext } from "@apollo/server";
import { ulid } from "@dino/common";
import {
  PrismaEngineError,
  PrismaKnownError,
  PrismaUnknownError,
} from "@dino/prisma";
import { Kind, OperationDefinitionNode } from "graphql";
import { DefaultMethods, Signale, SignaleOptions } from "signale";
import { __port__, __prod__ } from "./constant/artifacts";

/**
 * Custom logger
 */
export class Logger extends Signale<DefaultMethods | "announce" | "metrics"> {
  /**
   * Scope the logger under an operation
   * @param operation Operation to scoped against
   * @param fallback Fallback name if the operation has nothing to uniquely scoped about
   */
  public under(
    operation: OperationDefinitionNode | undefined,
    fallback: string
  ) {
    const scope =
      operation?.name?.value ??
      operation?.selectionSet?.selections
        ?.map((select) => (select.kind === Kind.FIELD ? select.name.value : ""))
        ?.filter((name) => !!name.length)
        ?.join(" + ") ??
      fallback;

    return this.scope(scope);
  }

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
      logger.warn(e.message.split("\n").at(0)?.trim() ?? e.message);
    } else if (e instanceof PrismaUnknownError) {
      logger.error(e.message.split("\n").at(0)?.trim() ?? e.message.trim());
    } else if (e instanceof PrismaEngineError) {
      logger.fatal(e.message.split("\n").at(0)?.trim() ?? e.message.trim());
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
): Logger =>
  new Logger({
    ...options,
    logLevel: __prod__ ? "error" : "info",
    types: {
      announce: {
        badge: "📣",
        label: "announce",
        color: "magenta",
        logLevel: "fatal",
      },
      metrics: {
        badge: "📟",
        label: "metrics",
        color: "blue",
        logLevel: "debug",
      },
    },
  });

/**
 * Loggable GraphQLRequest to GraphQLResponse events
 */
type LoggableEvents = "trace" | "invalid" | "unexpected" | "errors";

/**
 * Create a ApolloServer plugin for logging purposes
 * @param logger Logger used
 * @param events Events to be logged
 */
export const ApolloServerLoggerPlugin = <C extends BaseContext>(
  logger: Logger,
  events: LoggableEvents[] = []
): ApolloServerPlugin<C> => {
  const eventSets = new Set(events);
  const [logTrace, logInvalid, logUnexpected, logErrors] = [
    eventSets.has("trace"),
    eventSets.has("invalid"),
    eventSets.has("unexpected"),
    eventSets.has("errors"),
  ];

  return {
    async requestDidStart() {
      const start = Date.now();
      return {
        async willSendResponse({ operation, queryHash }) {
          if (!logTrace) return;
          logger
            .under(operation, queryHash)
            .metrics(`Operation finished in ${Date.now() - start}ms`);
        },
        async didEncounterErrors({ operation, queryHash, errors }) {
          if (!logErrors) return;
          const scoped = logger.under(operation, queryHash ?? "");
          errors.forEach((error) => scoped.error(error.message));
        },
      };
    },
    async invalidRequestWasReceived({ error }) {
      if (!logInvalid) return;
      logger.scope("👎").error(error.message);
    },
    async serverWillStart() {
      logger.scope("root").announce(`Running at http://localhost:${__port__}`);

      return {
        async serverWillStop() {
          logger.scope("root").announce("Shutting down");
        },
      };
    },
    async unexpectedErrorProcessingRequest({
      requestContext: { operation, queryHash },
      error,
    }) {
      if (!logUnexpected) return;
      logger.under(operation, queryHash ?? "🤨").error(error.message);
    },
  };
};
