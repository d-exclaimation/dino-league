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

  /**
   * Check if the result is an ok
   * @returns True if this Result is am Ok
   */
  public isOk(): this is Ok<T> {
    return this.result.__type === "ok";
  }

  /**
   * Check if the result is an error
   * @returns True if this Result is am Err
   */
  public isErr(): this is Err<E> {
    return this.result.__type === "err";
  }

  /**
   * Get the data value or throw an error if not possible
   * @returns Assumed successful value if the result is an ok
   * @throws The error if the result is an error
   */
  public unwrap(): T {
    if (this.result.__type === "err") {
      throw this.result.error;
    }
    return this.result.data;
  }

  /**
   * Get the error value or throw an Error class if not possible
   * @returns Assumed error value if the result is an ok
   * @throws An error if the result is an ok
   */
  public unwrapErr(): E {
    if (this.result.__type === "err") {
      return this.result.error;
    }
    throw new Error("No error from this result");
  }

  /**
   * Maps the successful value if result is an ok
   * @param func Function to mapped the successful value if result is an ok
   * @returns The result with the mapped value
   */
  public map<U>(func: (data: T) => U): Result<U, E> {
    if (this.result.__type == "ok") {
      return Result.ok(func(this.result.data));
    }
    return Result.err(this.result.error);
  }

  /**
   * Maps the successful value into another result if result is an ok
   * @param func Function to mapped the successful value if result is an ok
   * @returns The new result
   */
  public then<U, F>(func: (data: T) => Result<U, F>): Result<U, E | F> {
    if (this.result.__type == "ok") {
      return func(this.result.data);
    }
    return Result.err(this.result.error);
  }

  /**
   * Maps the unsuccessful error into another result if result is an error
   * @param func Function to mapped the unsuccessful error if result is an error
   * @returns The new result
   */
  public catch<U, F>(func: (error: E) => Result<U, F>): Result<U | T, E | F> {
    if (this.result.__type == "err") {
      return func(this.result.error);
    }
    return Result.ok(this.result.data);
  }

  /**
   * Return this result if it's an ok, or the new value if it's an error
   * @param res The new result to replace if the result is an error
   * @returns The new or old result
   */
  public or<U, F>(res: Result<U, F>): Result<T | U, F> {
    if (this.result.__type === "err") {
      return res;
    }
    return Result.ok(this.result.data);
  }

  /**
   * Return the value if it's an ok, or the new value if it's an error
   * @param res The new value to replace if the result is an error
   * @returns The new or old value
   */
  public else(res: T): T {
    if (this.result.__type === "err") {
      return res;
    }
    return this.result.data;
  }

  /**
   * Create an ok result
   * @param data The successsful value
   * @returns An ok result
   */
  public static ok<T>(data: T): Result<T, never> {
    return new Ok(typed("ok", { data }));
  }

  /**
   * Create an error result
   * @param error The unsuccesssful error
   * @returns An error result
   */
  public static err<E>(error: E): Result<never, E> {
    return new Err(typed("err", { error }));
  }

  /**
   * Create a result from a function
   * @param op The function to retreive the value or throw an error
   * @returns An ok result if the function returns successful, an error result otherwise
   */
  public static from<T>(op: () => T): Result<T, unknown> {
    try {
      return Result.ok(op());
    } catch (e: unknown) {
      return Result.err(e);
    }
  }

  /**
   * Create a result from a promise
   * @param promise The promise to retreive the value or throw an error
   * @returns An ok result if the promise returns successful, an error result otherwise
   */
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

/**
 * Ok result class type
 */
export class Ok<T> extends Result<T, never> {
  constructor(union: Pattern<"ok", { data: T }>) {
    super(union);
  }

  /**
   * Get the data from this ok result
   */
  public get data(): T {
    if (this.result.__type === "err") {
      throw this.result.error;
    }
    return this.result.data;
  }
}

/**
 * Error result class type
 */
export class Err<E> extends Result<never, E> {
  constructor(union: Pattern<"err", { error: E }>) {
    super(union);
  }

  /**
   * Get the error from this error result
   */
  public get error(): E {
    if (this.result.__type === "ok") {
      throw new Error("No error from this result");
    }
    return this.result.error;
  }
}
