//
//  result.ts
//  dino-league
//
//  Created by d-exclaimation on 26 Nov 2022
//

import { typed } from "./typed";
import type { Pattern } from "./union";

/**
 * Resulting union types
 */
type Res<T, E = never> =
  | Pattern<"ok", { data: T }>
  | Pattern<"err", { error: E }>;

/**
 * Result class type
 */
export abstract class Result<T, E = never> {
  constructor(public result: Res<T, E>) {}

  public isOk(): this is Ok<T> {
    return this.result.__type === "ok";
  }

  public isErr(): this is Err<E> {
    return this.result.__type === "err";
  }

  public unwrap(): T {
    if (this.result.__type === "err") {
      throw this.result.error;
    }
    return this.result.data;
  }

  public unwrapErr(): E {
    if (this.result.__type === "err") {
      return this.result.error;
    }
    throw new Error("No error from this result");
  }

  public map<U>(func: (data: T) => U): Result<U, E> {
    if (this.result.__type == "ok") {
      return Result.ok(func(this.result.data));
    }
    return Result.err(this.result.error);
  }

  public then<U, F>(func: (data: T) => Result<U, F>): Result<U, E | F> {
    if (this.result.__type == "ok") {
      return func(this.result.data);
    }
    return Result.err(this.result.error);
  }

  public or<U, F>(res: Result<U, F>): Result<T | U, F> {
    if (this.result.__type === "err") {
      return res;
    }
    return Result.ok(this.result.data);
  }

  public static ok<T>(data: T): Result<T, never> {
    return new Ok(typed("ok", { data }));
  }

  public static err<E>(error: E): Result<never, E> {
    return new Err(typed("err", { error }));
  }

  public static from<T>(op: () => T): Result<T, unknown> {
    try {
      return Result.ok(op());
    } catch (e: unknown) {
      return Result.err(e);
    }
  }

  public static async promise<T>(
    promise: Promise<T>
  ): Promise<Result<T, unknown>> {
    try {
      const data = await promise;
      return Result.ok(data);
    } catch (e: unknown) {
      return Result.err(e);
    }
  }
}

export class Ok<T> extends Result<T, never> {
  constructor(union: Pattern<"ok", { data: T }>) {
    super(union);
  }

  public get data(): T {
    if (this.result.__type === "err") {
      throw this.result.error;
    }
    return this.result.data;
  }
}

export class Err<E> extends Result<never, E> {
  constructor(union: Pattern<"err", { error: E }>) {
    super(union);
  }

  public get error(): E {
    if (this.result.__type === "ok") {
      throw new Error("No error from this result");
    }
    return this.result.error;
  }
}
