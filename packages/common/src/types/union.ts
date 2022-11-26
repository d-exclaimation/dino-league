//
//  union.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

/**
 * Pattern matchable type for union
 */
export type Pattern<
  Type extends string,
  Value = undefined
> = Value extends undefined
  ? { __type: Type }
  : { __type: Type } & (Value extends object ? Value : { payload: Value });
