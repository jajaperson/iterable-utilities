import { kComb } from "./internal/util.ts";

/**
 * {@link from | `from`} generator callback.
 * @typeParam T - see {@link from | `from`}
 */
export interface FromCallback<T> {
  /**
   * {@link from | `from`} generator callback.
   * @callback FromCallback
   * @param index - The current index.
   */
  (index: number): T;
}

/**
 * Creates an iterator from the return values of a function.
 * @param {FromCallback} f - A function which optionally takes the index as an
 * argument and
 * returns the next item in the iterator.
 * @typeParam T - The return type of `f`, and thus the item type of the new
 * iterator
 */
export function* from<T>(f: FromCallback<T>): IterableIterator<T> {
  let index = 0;
  while (true) {
    yield f(index);
    index++;
  }
}

/**
 * Creates an endless iterable of pseudorandom numbers.
 * @returns An iterator containing lazily calculated pseudorandom numbers.
 */
export function* randomNumbers(): IterableIterator<number> {
  yield* from(Math.random);
}

/**
 * Creates an endless iterable of a constant value.
 * @param value The value of all items in the returned iterator.
 * @returns An endless iterator of `value`.
 */
export function* constant<T>(value: T): IterableIterator<T> {
  yield* from(kComb(value));
}
