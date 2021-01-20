/**
 * Calls a defined callback function for each element of an iterable, and
 * returns a new array of the results.
 * @param it The iterable being mapped.
 * @param f A function which excepts an item of `it` as a single argument.
 * Called for every item of `it`.
 */
export function* map<T, U = T>(
  it: Iterable<T>,
  f: (i: T) => U,
): IterableIterator<U> {
  for (const i of it) {
    yield f(i);
  }
}

/**
 * Returns a new iterable containing the first `n` elements of `it`.
 * @param it The iterable being taken from.
 * @param n The number of elements to take.
 */
export function* take<T>(it: Iterable<T>, n: number): IterableIterator<T> {
  for (let i = 0; i < n; i++) {
    yield it[Symbol.iterator]().next().value;
  }
}
