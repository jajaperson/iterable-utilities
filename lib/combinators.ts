/**
 * Creates a new iterator containing tuples of each element of `it1` and `it2`.
 * @param it1 Iterator to be mapped to the first element of each tuple in the new iterator.
 * @param it2 Iterator to be mapped to the second element of each tuple in the new iterator.
 */
export function* pair<T, U>(
  it1: Iterable<T>,
  it2: Iterable<U>
): IterableIterator<[T, U]> {
  while (true) {
    yield [
      it1[Symbol.iterator]().next().value,
      it2[Symbol.iterator]().next().value,
    ];
  }
}

/**
 * Combines two or more iterators.
 * @param head The first iterator.
 * @param tails Additional iterators to add to the end of head.
 * If there are more than one, they must be of the same type.
 */
export function* concat<T, U = T>(
  head: Iterable<T>,
  ...tails: Array<Iterable<U>>
): IterableIterator<T | U> {
  yield* head;
  for (const it of tails) {
    yield* it;
  }
}

[].concat;
