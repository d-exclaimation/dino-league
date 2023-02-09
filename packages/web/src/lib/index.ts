//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 20 Jan 2023
//

import { Lib as CommonLib } from "@dino/common";

export const Lib = {
  ...CommonLib,
  price: {
    ...CommonLib.price,
    uncommon: Math.round(CommonLib.scaling(25) * CommonLib.price.avg),
    rare: Math.round(CommonLib.scaling(50) * CommonLib.price.avg),
    epic: Math.round(CommonLib.scaling(75) * CommonLib.price.avg),
    ultra: Math.round(CommonLib.scaling(100) * CommonLib.price.avg),
  },
};
