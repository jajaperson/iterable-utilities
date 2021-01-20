import { kComb } from "./util.ts";

/**
 * Creates an iterator from the return values of a function.
 * @param f A function which optionally takes the index as an argument and
 * returns the next item in the iterator,
 */
export function* from<T>(
  f: (() => T) | ((i: number) => T)
): IterableIterator<T> {
  let index = 0;
  while (true) {
    yield f(index);
    index++;
  }
}

/**
 * Creates an endless iterable of pseudorandom numbers.
 */
export function* randomNumbers(): IterableIterator<number> {
  yield* from(Math.random);
}

/**
 * Creates an endless iterable of a constant value.
 * @param value The value of all items in the returned iterator.
 */
export function* constant<T>(value: T): IterableIterator<T> {
  yield* from(kComb(value));
}
