//
//  index.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPrismaPlugin, createPrisma } from "@dino/prisma";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import "reflect-metadata";
import { verify } from "./auth";
import { __port__, __prod__ } from "./constant/artifacts";
import type { Context } from "./context";
import { ApolloServerLoggerPlugin, createLogger } from "./logger";
import { createSchema } from "./schema";
import { User } from "./user/graphql";

async function main() {
  const app = express();
  const http = createServer(app);
  const prisma = createPrisma({
    log: ["error", "warn"],
  });
  const logger = createLogger({
    config: {
      displayDate: __prod__,
      displayTimestamp: true,
    },
  });
  const schema = await createSchema();

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: http }),
      ApolloServerPrismaPlugin(prisma),
      ApolloServerLoggerPlugin(logger, ["trace", "errors", "unexpected"]),
    ],
  });
  await server.start();

  app.use(json());
  app.use(
    cors({
      methods: ["GET", "POST"],
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        ...[3000, 5173].map((port) => `http://localhost:${port}`),
      ],
      allowedHeaders: [
        "Authorization",
        "Content-Type",
        "Proxy-Authorization",
        "Sec-WebSocket-Protocol",
        "User-Agent",
        "X-Requested-With",
        "apollographql-client-name",
        "apollographql-client-version",
      ],
    })
  );
  app.use(
    expressMiddleware(server, {
      async context({ req }) {
        const token = req.headers["authorization"]?.split(" ")?.at(-1);
        if (!token) {
          return { prisma, logger, req };
        }
        const jwt = await verify<{ id: string }>(token);

        if (!jwt) {
          return { prisma, logger, req };
        }

        try {
          const { id } = jwt;
          const user = await prisma.user.findUnique({ where: { id } });

          return {
            prisma,
            user: user ? User.from(user) : undefined,
            logger,
            req,
          };
        } catch (e: unknown) {
          logger.customError(e, "context");
          return { prisma, logger, req };
        }
      },
    })
  );

  await new Promise<void>((resolve) =>
    http.listen({ port: __port__ }, resolve)
  );
}

main().catch((reason) => console.log(reason));
