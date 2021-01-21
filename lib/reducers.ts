import { kComb, stripIterable } from "./internal/util.ts";
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
   * accumulated value previously returned in the last invocation of the callback
   * --- or initialValue, if supplied.
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
    accumulator = reducer(accumulator, item, index, stripIterable(it));
    if (stop(accumulator, item, index, stripIterable(it))) {
      break;
    }
    index++;
  }
  return accumulator;
}

/**
 * Determines whether the specified callback function returns true for any item
 * in an iterable.
 * @param it - The iterable to be tested.
 * @param {IterablePredicateCallback} predicate A function that accepts up to
 * three arguments. The some method calls the predicate function for each
 * element in the array until the predicate returns a value
 * @typeParam T - The type of items in `it`.
 * @returns Whether any of the items in `it` predicate true.
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
 * Determines whether the specified callback function returns true for all items
 * in an iterable.
 * @param it - The iterable to be tested.
 * @param {IterablePredicateCallback} predicate A function that accepts up to
 * three arguments. The some method calls the predicate function for each
 * element in the array until the predicate returns a value
 * @typeParam T - The type of items in `it`.
 * @returns Whether any of the items in `it` predicate true.
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
