import { IterableCircular } from "./types.ts";
import { kComb } from "./internal/util.ts";

/**
 * {@link from | `from`} generator callback.
 * @typeParam T - see {@link endlessfrom | `from`}
 */
export interface FromCallback<T> {
  /**
   * {@link from | `from`} generator callback.
   * @callback FromCallback
   * @param index - The current index.
   * @returns An iterator result (as returned by `iterator.next()`)
   */
  (index: number): IteratorResult<T>;
}

/**
 * Creates an iterable from IteratorResults returned by a function.
 * @param {FromCallback} f - A function which optianally takes the index as an
 * argument and returns the next IteratorResult.
 * @typeParam T - The type of values for the returned iterable.
 * @returns An iterable containing the `value` property of the results of `f`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const upTo6 = from((index) =>
 *   index < 6 ? { value: index } : { value: index, done: true },
 * );
 *
 * for (num of upTo6) {
 *   console.log(num);
 * }
 *
 * // -> 0
 * // -> 1
 * // -> 2
 * // -> 3
 * // -> 4
 * // -> 5
 * // -> 6
 * ```
 */
export function from<T>(f: FromCallback<T>): IterableCircular<T> {
  return {
    *[Symbol.iterator]() {
      let index = 0;
      while (true) {
        const next = f(index++);
        if (next.done) return next.value;
        yield next.value;
      }
    },
  };
}

/**
 * {@link endlessFrom | `endlessFrom`} generator callback.
 * @typeParam T - see {@link endlessfrom | `endlessFrom`}
 */
export interface EndlessFromCallback<T> {
  /**
   * {@link endlessFrom | `endlessFrom`} generator callback.
   * @callback EndlessFromCallback
   * @param index - The current index.
   * @returns The next value for the iterator.
   */
  (index: number): T;
}

/**
 * Creates an endless iterable from the return values of a function.
 * @param {EndlessFromCallback} f - A function which optionally takes the index
 * as an argument and returns the next item in the iterable.
 * @typeParam T - The return type of `f`, and thus the item type of the new
 * iterator.
 * @returns An iterable containing the results of `f`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const evenNumbers = iter.create.endlessFrom(index => 2 * index);
 * const iterator = evenNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 2
 * console.log(iterator.next().value); // -> 4
 * console.log(iterator.next().value); // -> 6
 * console.log(iterator.next().value); // -> 8
 * console.log(iterator.next().value); // -> 10
 * ```
 */
export function endlessFrom<T>(f: EndlessFromCallback<T>): IterableCircular<T> {
  return {
    *[Symbol.iterator]() {
      let index = 0;
      while (true) {
        yield f(index++);
      }
    },
  };
}

/**
 * Constructs an iterable from an iterable of its results.
 * @param results - An iterable (such as an array) of results.
 * @returns - The constructed iterable.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts"
 *
 * // iter1 and iter2 are equivelant
 * const iter1 = iter.create.endlessFrom([
 *   { value: 0, done: false },
 *   { value: 1, done: false },
 *   { value: 2, done: false },
 *   { value: 3, done: true },
 * ])[Symbol.iterator]
 * const iter2 = function* () {
 *   yield 0;
 *   yield 1;
 *   yield 2;
 *   return 3;
 * }();
 *
 * console.log(iter1.next()) // -> { value: 0, done: false }
 * console.log(iter1.next()) // -> { value: 1, done: false }
 * console.log(iter1.next()) // -> { value: 2, done: false }
 * console.log(iter1.next()) // -> { value: 3, done: true }
 * ```
 */
export function fromResults<T>(
  results: Iterable<IteratorResult<T>>,
): IterableCircular<T> {
  return {
    [Symbol.iterator]() {
      const iterator = results[Symbol.iterator]();

      return {
        next(): IteratorResult<T> {
          const next = iterator.next();
          if (next.value == null) {
            return { value: undefined, done: true };
          } else {
            return next.value;
          }
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    },
  };
}

/**
 * Creates an endless iterable of pseudorandom numbers.
 * @returns An iterable containing lazily calculated pseudorandom numbers.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const randomNumbers = iter.create.randomNumbers();
 * const iterator = randomNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // ~> 0.932425207964471
 * console.log(iterator.next().value); // ~> 0.5680601537274907
 * console.log(iterator.next().value); // ~> 0.8929258116004206
 * console.log(iterator.next().value); // ~> 0.2066840236433234
 * console.log(iterator.next().value); // ~> 0.4786954722155117
 * console.log(iterator.next().value); // ~> 0.5199689620612802
 * ```
 */
export function randomNumbers(): IterableCircular<number> {
  return endlessFrom(Math.random);
}

/**
 * Creates an endless iterable of a constant value.
 * @param value The value of all items in the returned iterable.
 * @returns An endless iterable of `value`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const zeros = iter.create.constant(0);
 * const iterator = randomNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * ```
 */
export function constant<T>(value: T): IterableCircular<T> {
  return endlessFrom(kComb(value));
}

/**
 * Creates an endless iterable of incrementing numbers.
 * @param initial - The initial value.
 * @param step - The increment amount.
 * @returns An endless iterable of incrementing numbers.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const naturals = iter.create.increments(1);
 * const naturalsIterator = numbers[Symbol.iterator]();
 *
 * console.log(naturalsIterator.next().value); // -> 1
 * console.log(naturalsIterator.next().value); // -> 2
 * console.log(naturalsIterator.next().value); // -> 3
 * console.log(naturalsIterator.next().value); // -> 4
 * console.log(naturalsIterator.next().value); // -> 5
 * console.log(naturalsIterator.next().value); // -> 6
 *
 * const odds = iter.create.increments(1, 2);
 * const oddsIterator = odds[Symbol.iterator]();
 *
 * console.log(oddsIterator.next().value); // -> 1
 * console.log(oddsIterator.next().value); // -> 3
 * console.log(oddsIterator.next().value); // -> 5
 * console.log(oddsIterator.next().value); // -> 7
 * console.log(oddsIterator.next().value); // -> 9
 * console.log(oddsIterator.next().value); // -> 11
 * ```
 */
export function increments(initial = 0, step = 1): IterableCircular<number> {
  return endlessFrom((index) => initial + index * step);
}

/**
 * Creates an iterable over an inclusive range of numbers.
 * @param endOrStart - If no other arguments are provided, the range will go
 * from 0 until `endOrRangeStart`. Otherwise, this acts as the start of the
 * range.
 * @param end - The end of the range.
 * @param step - The amount to increment each time. Sign is ignored.
 * @returns An iterable over the range.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const range1 = iter.create.range(5);
 * console.log(...range1); // -> 0 1 2 3 4 5
 *
 * const range2 = iter.create.range(11,16);
 * console.log(...range2); // -> 11 12 13 14 15 16
 *
 * const range3 = iter.create.range(14,24,2);
 * console.log(...range3); // -> 14 16 18 20 22 24
 *
 * const range4 = iter.create.range(12, 2, 2);
 * console.log(...range4); // -> 12 10 8 6 4 2
 * ```
 */
export function range(
  endOrStart: number,
  end?: number,
  step = 1,
): IterableCircular<number> {
  const start = end ? endOrStart : 0;
  const newEnd = end ? end : endOrStart;

  step = Math.abs(step);
  const upwards = newEnd > start;
  if (!upwards) {
    step *= -1;
  }

  const shouldStop = (i: number) => upwards ? i <= newEnd : i >= newEnd;

  return {
    *[Symbol.iterator]() {
      for (let i = start; shouldStop(i); i += step) {
        yield i;
      }
    },
  };
}
