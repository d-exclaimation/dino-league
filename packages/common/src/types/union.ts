//
//  union.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

import type { Typed } from "./typed";

/**
 * Pattern matchable type for union
 */
export type Pattern<
  Type extends string,
  Value = undefined
> = Value extends undefined
  ? Typed<Type>
  : Typed<Type, Value extends Record<string, any> ? Value : { payload: Value }>;
