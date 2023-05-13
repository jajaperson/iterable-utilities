import { CurriedIterFunction, IterFunction } from "../types.ts";

/**
 * Creates a function which always returns the same value.
 * @param value - The value to be returned
 * @typeParam T - The type of the constant
 * @internal
 */
export function kComb<T>(value: T): () => T {
  return () => value;
}

const underlying = Symbol();

class StrippedIterable<T> implements Iterable<T> {
  [underlying]: Iterable<T>;

  constructor(original: Iterable<T>) {
    this[underlying] = original;
  }

  [Symbol.iterator]() {
    return this[underlying][Symbol.iterator]();
  }
}

/**
 * Strips an iterable of all other properties so it only contains the iterator
 * symbol
 * @param it - The iterator to be stripped.
 * @typeParam T - The iterable's item type.
 * @returns An iterable object stripped of all other properties.
 * @internal
 */
export function stripIterable<T>(it: Iterable<T>): StrippedIterable<T> {
  return new StrippedIterable(it);
}

/**
 * Curries a iter function for partial application.
 * @param function - The function to curry.
 * @typeParam T - The iterable's item type.
 * @typeParam U - The function's return type.
 * @typeParam Args - The other argument types for `function` as a tuple.
 * @returns A curried `function`.
 * @internal
 */
export function curryIterFunction<T, U, Args extends unknown[]>(
  f: IterFunction<T, U, Args>,
): CurriedIterFunction<T, U, Args> {
  return (...args) => (it) => f(it, ...args);
}

/**
 * Check if a value is an iterable.
 * @param x - The value to be checked
 * @returns Whether the value implements `Iterable`
 */
// deno-lint-ignore no-explicit-any
export function isIterable(x: any): x is Iterable<any> {
  return typeof x[Symbol.iterator] === "function";
}
