//
//  FC.ts
//  dino-league
//
//  Created by d-exclaimation on 01 Jan 2023
//

import type { FC } from "react";

export type InferProps<C extends FC<any>> = C extends FC<infer Props>
  ? Props
  : {};
