//
//  index.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 19 Nov 2022
//

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import express from "express";
import { createServer } from "http";
import { __port__ } from "./constant/artifacts";
import type { Context } from "./context";
import { BasicDinoStorage } from "./dino/storage/basic";
import { schema } from "./schema";

async function main() {
  const app = express();
  const http = createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer: http })],
  });
  await server.start();

  app.use(json());
  app.use(
    expressMiddleware(server, {
      context: async () => ({ storage: new BasicDinoStorage() }),
    })
  );

  await new Promise<void>((resolve) =>
    http.listen({ port: __port__ }, resolve)
  );
}

main()
  .catch((reason) => console.log(reason))
  .then(() => console.log(`🚀 Running at http://localhost:${__port__}`));
