import { IterablePredicateCallback } from "./types.ts";

/**
 * @link map | `map`} callback.
 * @typeParam T - See {@link map}
 * @typeParam U - See {@link map}
 */
export interface MapCallback<T, U> {
  /**
   * {@link map | `map`} callback.
   * @callback MapCallback
   * @param item - The current item to be mapped.
   * @param index - The index of the item.
   * @param it - The iterable.
   * @returns The mapped value
   */
  (item: T, index: number, it: Iterable<T>): U;
}

/**
 * Lazily calls a defined callback function for each element of an iterable, and
 * returns a new iterable of the results.
 * @param it - The iterable being mapped.
 * @param {MapCallback} f - A function that accepts up to three arguments. The
 * map method calls `f` function one time for each item in the iterable.
 * @typeParam T - Type of items in `it`.
 * @typeParam U - Return type of `f`.
 * @returns An iterable of `f` applied to items of `it`.
 */
export function map<T, U = T>(
  it: Iterable<T>,
  f: MapCallback<T, U>,
): Iterable<U> {
  return {
    *[Symbol.iterator](): IterableIterator<U> {
      let index = 0;
      for (const item of it) yield f(item, index++, it);
    },
  };
}

/**
 * Returns a new iterable containing the first `n` items of `it`.
 * @param it - The iterable being taken from.
 * @param n - The number of items to take.
 * @typeParam T - The type of items in both `it` and the returned iterable.
 * @returns A new iterable of `it` which terminates after `n` items.
 */
export function take<T>(it: Iterable<T>, n: number): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
      const iterator = it[Symbol.iterator]();
      for (let i = 0; i < n; i++) yield iterator.next().value;
    },
  };
}

/**
 * Returns a new iterable which yields until `f` returns true.
 * true.
 * @param it - The iterable being cut.
 * @param {IterablePredicateCallback} f - A function that accepts up to three
 * arguments. The cut method calls `f` one time for each item in the iterable.
 * @param includeLast - Whether the item for which `f` returns true should be
 * included.
 * @typeParam T - The type of items in both `it` and the returned iterable.
 * @returns A new iterables of `it` which terminates
 * @alias until
 */
export function until<T>(
  it: Iterable<T>,
  f: IterablePredicateCallback<T>,
  includeLast = true,
): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
      let index = 0;
      for (const item of it) {
        const done = f(item, index++, it);
        if (done) {
          if (includeLast) {
            yield item;
          }
          break;
        }
        yield item;
      }
    },
  };
}

/**
 * Returns the items of an iterable that meet the condition specified in a
 * callback function.
 * @param it - The iterable being filtered
 * @param {IterablePredicateCallback} predicate - A function that accepts up to
 * three arguments. The filter method calls the predicate function one time for
 * each item in the iterable.
 * @typeParam T - The type of items in `it`.
 * @returns A new iterable
 */
export function filter<T>(
  it: Iterable<T>,
  predicate: IterablePredicateCallback<T>,
): Iterable<T> {
  return {
    *[Symbol.iterator](): IterableIterator<T> {
      let index = 0;
      for (const item of it) {
        if (predicate(item, index++, it)) {
          yield item;
        }
      }
    },
  };
}

/**
 * Converts an iterable into a series of pairs of indices and values. Similar to
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries | `Array.prototype.entries`}.
 * @param it - The iterable being indexed.
 * @typeParam T - The type of items in `it`.
 * @returns An iterable over pairs of indices and the items in `it`.
 */
export function indexedPairs<T>(it: Iterable<T>): Iterable<[number, T]> {
  return {
    *[Symbol.iterator](): IterableIterator<[number, T]> {
      let index = 0;
      for (const item of it) {
        yield [index++, item];
      }
    },
  };
}

/**
 * Splits an iterable into evenly sized chunks. See
 * {@link https://ghub.io/@sindresorhus/chunkify | @sindresorhus/chunkify }
 * @param it - The iterable being chunkified.
 * @param chunkSize - The size of each chunk.
 * @typeParam T - The type of items in `it`.
 * @returns A new iterable over chunk arrays.
 */
export function chunkify<T>(it: Iterable<T>, chunkSize: number): Iterable<T[]> {
  if (!(Number.isSafeInteger(chunkSize) && chunkSize > 0)) {
    throw new RangeError(
      `Expected \`chunkSize\` to be an integer from 1 and up, got \`${chunkSize}\``,
    );
  }

  return {
    *[Symbol.iterator](): IterableIterator<T[]> {
      if (Array.isArray(it)) {
        for (let index = 0; index < it.length; index += chunkSize) {
          yield it.slice(index, index + chunkSize);
          return;
        }
      }

      let chunk = [];

      for (const value of it) {
        chunk.push(value);

        if (chunk.length === chunkSize) {
          yield chunk;
          chunk = [];
        }
      }

      if (chunk.length > 0) {
        yield chunk;
      }
    },
  };
}
