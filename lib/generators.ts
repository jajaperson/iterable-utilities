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
export function from<T>(f: FromCallback<T>): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
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
export function endlessFrom<T>(f: EndlessFromCallback<T>): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
      let index = 0;
      while (true) {
        yield f(index++);
      }
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
export function randomNumbers(): Iterable<number> {
  return {
    *[Symbol.iterator](): IterableIterator<number> {
      yield* endlessFrom(Math.random);
    },
  };
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
export function constant<T>(value: T): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
      yield* endlessFrom(kComb(value));
    },
  };
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
export function increments(initial = 0, step = 1): Iterable<number> {
  return {
    *[Symbol.iterator](): IterableIterator<number> {
      yield* endlessFrom((index) => initial + index * step);
    },
  };
}
