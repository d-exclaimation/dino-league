//
//  InferProps.ts
//  dino-league
//
//  Created by d-exclaimation on 23 Dec 2022
//

import type { FC } from "react";

export type InferProps<T> = T extends FC<infer Props> ? Props : {};
