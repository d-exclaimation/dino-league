//
//  index.ts
//  dino-league
//
//  Created by d-exclaimation on 28 Dec 2022
//

import type { Narrow, Union } from "@d-exclaimation/common/union";

/**
 * Result construct from Swift, Rust, and Scala
 *
 * @template T the data type
 * @template E the error type
 */
export type Result<T, E = Error> = Union<{
  ok: { data: T };
  err: { err: E };
}>;

/**
 * Wrap a throwing function in a result
 * @param fn Function that may throws
 * @returns A result of either the return type or error
 */
export function result<T>(fn: () => T): Result<T, Error> {
  try {
    const data = fn();
    return { __t: "ok", data };
  } catch (e: unknown) {
    return { __t: "err", err: e instanceof Error ? e : new Error(`${e}`) };
  }
}

/**
 * Wrap an async throwing function in a result
 * @param fn Function that may throws
 * @returns A result of either the return type or error
 */
export async function asyncResult<T>(
  fn: () => Promise<T>
): Promise<Result<T, Error>> {
  try {
    const data = await fn();
    return { __t: "ok", data };
  } catch (e: unknown) {
    return { __t: "err", err: e instanceof Error ? e : new Error(`${e}`) };
  }
}

/**
 * Wrap a data as ok result
 */
export const ok = <T>(data: T): Narrow<Result<T, never>, "ok"> => ({
  __t: "ok",
  data,
});

/**
 * Wrap a data as error result
 */
export const err = <E>(err: E): Narrow<Result<never, E>, "err"> => ({
  __t: "err",
  err,
});

/**
 * Unwrap the data value if the result will never throw a error
 * @param res Result to unwrap
 */
export const unwrap = <T>(res: Result<T, never>): T =>
  (res as Narrow<Result<T, never>, "ok">).data;

/**
 * Unwrap the error if the result will always the error
 * @param res Result to unwrap
 */
export const unwrapError = <E>(res: Result<never, E>): E =>
  (res as Narrow<Result<never, E>, "err">).err;
