import { kComb } from "./internal/util.ts";
import { IterablePredicateCallback } from "./types.ts";
import { map } from "./transformers.ts";

/**
 * {@link reduce | `reduce`} accumulator callback.
 * @typeParam T - See {@link reduce}.
 * @typeParam U - See {@link reduce}.
 * @typeParam R - The function return type. Only set if the return type and
 */
export interface ReduceAccumulatorCallback<T, U> {
  /**
   * {@link reduce | `reduce`} accumulator callback.
   * @callback ReduceAccumulatorCallback
   * @param accumulator Accumulates the callback's return values. Is the
   * accumulated value previously returned in the last invocation of the
   * callback  --- or initialValue, if supplied.
   * @param currentValue The current item being processed in the iterable.
   * @param index The number of items in the iterable which have already been
   * processed,
   * @param iterable The iterable {@link reduce} was called on.
   * input type differ.
   * @returns The next `accumulator` value.
   */
  (accumulator: U, currentValue: T, index: number, iterable: Iterable<T>): U;
}

/**
 * {@link reduce | `reduce`} stop callback.
 * @typeParam T - See {@link reduce}.
 * @typeParam U - See {@link reduce}.
 */
export interface ReduceStopCallback<T, U> {
  /**
   * {@link reduce | `reduce`} stop callback.
   * @callback ReduceStopCallback
   * @param accumulator See {@link reducerAccumulator}
   * @param currentValue The current item being processed in the iterable.
   * @param index The number of items in the iterable which have already been
   * processed,
   * @param iterable The iterable {@link reduce} was called on.
   * @returns Whether the reducer should continue.
   */
  (
    accumulator: U,
    currentValue: T,
    index: number,
    iterable: Iterable<T>,
  ): boolean;
}

/**
 * Calls the specified callback function for all the items in an iterable. The
 * return value of the callback function is the accumulated result, and is
 * provided as an argument in the next call to the callback function.
 * @param it The iterable to be reduced.
 * @param {ReduceAccumulatorCallback} reducer A function that accepts up to
 * four arguments. The reduce function calls `f` one time for each item in the
 * iterable, unless it is stopped early.
 * @param initialValue If `initialValue` is specified, it is used as the initial
 * value to start accumulation. The first call to `f` provides this value as an
 * argument.
 * @param {ReduceStopCallback} stop A functin similar to `f`. If it returns false,
 * `reduce` will stop early and return the current accumulated value.
 * @typeParam T - Type of items in `it`.
 * @typeParam U - Type of accumulator and result.
 * @returns The final accumulator value.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter";
 *
 * const naturals = iter.create.increments(1);
 * // The first triangular number which is a multiple of 13
 * const luckyNumber = iter.reduce(
 *   naturals,
 *   (tot, n) => tot + n,
 *   0,
 *   (tot) => tot % 13 === 0,
 * );
 *
 * console.log(luckyNumber); // -> 78
 * ```
 */
export function reduce<T, U>(
  it: Iterable<T>,
  reducer: ReduceAccumulatorCallback<T, U>,
  initialValue: U, // TODO: Overload to make this optional
  stop: ReduceStopCallback<T, U> = kComb(false),
): U {
  let index = 0;
  let accumulator = initialValue;
  for (const item of it) {
    accumulator = reducer(accumulator, item, index, it);
    if (stop(accumulator, item, index, it)) break;
    index++;
  }
  return accumulator;
}

/**
 * Determines whether the specified callback function returns true for any item
 * in an iterable.
 *
 * :warning: When ran on an endless iterable for which `predicate` never returns
 * true, this functions will never return.
 * @param it - The iterable to be tested.
 * @param {IterablePredicateCallback} predicate A function that accepts up to
 * three arguments. The some function calls the predicate function for each
 * element in the array until the predicate returns a value
 * @typeParam T - The type of items in `it`.
 * @returns Whether any of the items in `it` predicate true.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter";
 *
 * const naturals = iter.create.increments(1);
 * const hasEvens = iter.some(naturals, (n) => n % 2 === 0);
 *
 * console.log(hasEvens); // -> true
 *
 * // Will never return.
 * // const hasNeg = iter.some(naturals, (n) => n < 0);
 * ```
 */
export function some<T>(
  it: Iterable<T>,
  predicate: IterablePredicateCallback<T>,
): boolean {
  const predicateResults = map(it, predicate);
  return reduce<boolean, boolean>(
    predicateResults,
    (acc, result) => acc || result,
    false,
    (acc) => acc,
  );
}

/**
 * Determines whether an iterable includes a certain element, returning true or
 * false as appropriate.
 *
 * :warning: When ran on an endless iterable which does not contain `value`,
 * this function never returns.
 * @param it - The iterable to be tested.
 * @param value - The item to search for.
 * @typeParam T - The type of items in `it`.
 * @returns Whether `value` is in `it`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter";
 *
 * const naturals = iter.create.increments(1);
 * const has100 = iter.includes(naturals, 100);
 *
 * console.log(has100); // -> true
 *
 * // Will never return.
 * // const has0 = iter.includes(naturals, 0);
 * ```
 */
export function includes<T>(it: Iterable<T>, value: T): boolean {
  for (const item of it) {
    if (item === value) return true;
  }
  return false;
}

/**
 * Determines whether the specified callback function returns true for all items
 * in an iterable.
 *
 * :warning: When ran on an endless iterable for which `predicate` never returns
 * false, this function will never return.
 * @param it - The iterable to be tested.
 * @param {IterablePredicateCallback} predicate A function that accepts up to
 * three arguments. The some function calls the predicate function for each
 * element in the array until the predicate returns a value
 * @typeParam T - The type of items in `it`.
 * @returns Whether any of the items in `it` predicate true.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter";
 *
 * const naturals = iter.create.increments(1);
 * const allOdd = iter.every(naturals, (n) => n % 2 === 1);
 *
 * console.log(allOdd); // -> false
 *
 * // Will never return.
 * // const allPositive = iter.every(naturals, (n) => n > 0);
 * ```
 */
export function every<T>(
  it: Iterable<T>,
  predicate: IterablePredicateCallback<T>,
): boolean {
  const predicateResults = map(it, predicate);
  return reduce<boolean, boolean>(
    predicateResults,
    (acc, result) => acc && result,
    true,
    (acc) => !acc,
  );
}

/**
 * Returns the value of the first item in the iterable where predicate is true,
 * and undefined otherwise.
 * @param it - The iterable to search.
 * @param {IterablePredicateCallback} predicate - Find calls predicate once for
 * each item in the iterable, in ascending order, until it finds one where
 * predicate returns true. If such an item is found, find immediately returns
 * that element value, Otherwise, find returns undefined.
 * @typeParams T - The type of items in `it`.
 * @returns The first item which satisfied `predicate`.
 * @example
 * ```ts
  * import * as iter from "https://deno.land/x/iter";
  *
  * const naturals = iter.create.increments(1);
  * // Find a solution to 20n = 2n² - 6n, n ∈ ℕ
  * const solution1 = iter.find(naturals, (n) => 20 * n === 2 * n ** 2 - 6 * n);
  *
  * console.log(solution1); // -> 13
  *
  * // Will never return.
  * // Find a solution to n³ = 3n, n ∈ ℕ
  * // const solution2 = iter.find(naturals, (n) => n ** 3 === 3 * n);
 */
export function find<T>(
  it: Iterable<T>,
  predicate: IterablePredicateCallback<T>,
): T | undefined {
  let index = 0;
  for (const item of it) {
    if (predicate(item, index++, it)) return item;
  }
  return undefined;
}

/**
 * Returns the index of the first item in the iterable where predicate is true,
 * and -1 otherwise.
 * @param it - The iterable to search.
 * @param {IterablePredicateCallback} predicate find calls predicate once for
 * each item in the iterable, in ascending order, until it finds one where
 * predicate returns true. If such an item is found, findIndex immediately
 * returns that element index. Otherwise, findIndex returns -1.
 * @typeParams T - The type of items in `it`.
 * @returns The first item which satisfied `predicate`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter";
 *
 * const naturals = iter.create.increments(1);
 * // Find a solution to 20n = 2n² - 6n, n ∈ ℕ
 * const solutionIndex1 = iter.findIndex(
 *   naturals,
 *   (n) => 20 * n === 2 * n ** 2 - 6 * n,
 * );
 *
 * console.log(solutionIndex1); // -> false
 *
 * // Will never return.
 * // Find a solution to n³ = 3n, n ∈ ℕ
 * const solutionIndex2 = iter.findIndex(naturals, (n) => n ** 3 === 3 * n);
 *
 * const first10 = iter.take(naturals, 10);
 * const pos = iter.findIndex(first10, x => x < 0);
 *
 * console.log(pos); // -> -1
 * ```
 */
export function findIndex<T>(
  it: Iterable<T>,
  predicate: IterablePredicateCallback<T>,
): number {
  let index = 0;
  for (const item of it) {
    if (predicate(item, index, it)) return index;
    index++;
  }
  return -1;
}
