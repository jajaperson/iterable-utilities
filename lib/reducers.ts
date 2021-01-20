import { kComb, Predicate } from "./util.ts";
import { map } from "./transformers.ts";

/**
 * Calls the specified callback function for all the items in an iterable. The
 * return value of the callback function is the accumulated result, and is
 * provided as an argument in the next call to the callback function.
 * @param it The iterable to be reduced.
 * @param {reducerAccumulator} f A function that accepts up to four arguments.
 * The reduce function calls `f` one time for each item in the iterable, unless
 * it is stopped early.
 * @param initialValue If `initialValue` is specified, it is used as the initial
 * value to start accumulation. The first call to `f` provides this value as an
 * argument.
 * @param {reducerStop} stop A functin similar to `f`. If it returns false,
 * `reduce` will stop early and return the current accumulated value.
 */
export function reduce<T, U>(
  it: Iterable<T>,
  f: (
    accumulator: U | undefined,
    currentValue: T,
    currentIndex?: number,
    iterable?: Iterable<T>,
  ) => U,
  initialValue?: U,
  stop: (
    accumulator: U | undefined,
    currentValue: T,
    currentIndex?: number,
    iterable?: Iterable<T>,
  ) => boolean | undefined = kComb(false),
): U | undefined {
  let index = 0;
  let accumulator = initialValue;
  for (const item of it) {
    accumulator = f(accumulator, item, index, it);
    if (stop(accumulator, item, index, it)) {
      break;
    }
    index++;
  }
  return accumulator;
}

// /**
//  * Determines whether the specified callback function returns true for any
//  * item of an iterable.
//  * @param it
//  * @param p
//  */
// export function some<T>(it: Iterable<T>, p: Predicate<T>): boolean {
//   const predicateResults = map(it, p);
//   return reduce(predicateResults);
// }

// JSDOC

/**
 * Reducer accumulator callback
 * @callback reducerAccumulator
 * @param accumulator Accumulates the callback's return values. Is the
 * accumulated value previously returned in the last invocation of the callback
 * --- or initialValue, if supplied.
 * @param currentValue The current item being processed in the iterable.
 * @param index The number of items in the iterable which have already been
 * processed,
 * @param iterable The iterable {@link reduce} was called on.
 * @returns The next `accumulator` value.
 */

/**
 * Reducer halt callback
 * @callback reducerStop
 * @param accumulator See {@link reducerAccumulator}
 * @param currentValue The current item being processed in the iterable.
 * @param index The number of items in the iterable which have already been
 * processed,
 * @param iterable The iterable {@link reduce} was called on.
 * @returns Whether the reducer should continue.
 */
