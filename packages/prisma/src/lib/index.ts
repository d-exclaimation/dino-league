//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 22 Nov 2022
//

import { Lib as CommonLib } from "@dino/common";
import * as effect from "./effect";
import * as variant from "./variant";

export const Lib = {
  ...CommonLib,
  ...variant,
  ...effect,
};
