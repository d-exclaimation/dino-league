//
//  typed.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

/**
 * Generic object type, useful for generic constraint
 */
export type AnyObject = Record<string | number | symbol, any>;

/**
 * Object with a distinguished type property
 */
export type Typed<Key extends string, Value extends AnyObject = {}> = {
  __type: Key;
} & Value;

/**
 * Create a typed object
 * @param __type Typename
 * @param value Original object
 * @returns A typed of the original object
 */
export function typed<Type extends string, Value extends AnyObject>(
  __type: Type,
  value: Value
): Typed<Type, Value> {
  return { __type, ...value };
}
