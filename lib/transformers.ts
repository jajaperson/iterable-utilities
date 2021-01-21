import { stripIterable } from "./internal/util.ts";

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
 * returns a new iterator of the results.
 * @param it - The iterable being mapped.
 * @param {MapCallback} f - A function that accepts up to three arguments. The
 * map method calls the callbackfn function one time for each element in the
 * array.
 * @typeParam T - Type of items in `it`.
 * @typeParam U - Return type of `f`.
 * @returns An iterator of `f` applied to items of `it`.
 */
export function* map<T, U = T>(
  it: Iterable<T>,
  f: MapCallback<T, U>,
): IterableIterator<U> {
  let i = 0;
  for (const item of it) {
    yield f(item, i, stripIterable(it));
    i++;
  }
}

/**
 * Returns a new iterable containing the first `n` items of `it`.
 * @param it - The iterable being taken from.
 * @param n - The number of items to take.
 * @typeParam T - The type of items in both `it` and the returned iterator.
 * @returns A new iterator of `it` which terminates after `n` items.
 */
export function* take<T>(it: Iterable<T>, n: number): IterableIterator<T> {
  const iterator = it[Symbol.iterator]();
  for (let i = 0; i < n; i++) {
    yield iterator.next().value;
  }
}
