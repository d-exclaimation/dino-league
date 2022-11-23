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
import express from "express";
import { createServer } from "http";
import { __port__ } from "./constant/artifacts";
import type { Context } from "./context";
import { schema } from "./schema";

async function main() {
  const app = express();
  const http = createServer(app);
  const prisma = createPrisma();

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer: http }),
      ApolloServerPrismaPlugin(prisma),
    ],
  });
  await server.start();

  app.use(json());
  app.use(
    expressMiddleware(server, {
      async context({ req }) {
        const id = req.headers["authorization"]?.split(" ")?.at(-1);
        if (!id) {
          return { prisma };
        }
        const user = await prisma.user.findUnique({
          where: { id },
        });

        return {
          prisma,
          user: user ?? undefined,
        };
      },
    })
  );

  await new Promise<void>((resolve) =>
    http.listen({ port: __port__ }, resolve)
  );
}

main()
  .catch((reason) => console.log(reason))
  .then(() => console.log(`🚀 Running at http://localhost:${__port__}`));
