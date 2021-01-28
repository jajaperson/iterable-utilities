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
 */
export function increments(initial = 0, step = 1): Iterable<number> {
  return {
    *[Symbol.iterator](): IterableIterator<number> {
      yield* endlessFrom((index) => initial + index * step);
    },
  };
}
