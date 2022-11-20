//
//  context.ts
//  nexus-prisma
//
//  Created by d-exclaimation on 20 Nov 2022
//

import { BasicDinoStorage } from "./dino/storage/basic";

export type Context = {
  storage: BasicDinoStorage;
};
