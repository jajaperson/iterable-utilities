/**
 * Creates a new iterable containing tuples of each element of `it1` and `it2`.
 * @param it1 - Iterable to be mapped to the first element of each tuple in the
 * new iterator.
 * @param it2 - Iterable to be mapped to the second element of each tuple in the
 * new iterator.
 * @typeParam T - Type of items in `it1`
 * @typeParam U - Type of items in `it2`
 * @returns An iterable containing pairs of items taken from `it1` and `it2`
 */
export function pair<T, U>(
  it1: Iterable<T>,
  it2: Iterable<U>,
): Iterable<[T, U]> {
  return {
    *[Symbol.iterator](): IterableIterator<[T, U]> {
      const iterator1 = it1[Symbol.iterator]();
      const iterator2 = it2[Symbol.iterator]();
      while (true) {
        const a = iterator1.next();
        const b = iterator2.next();
        if (a.done && b.done) break;
        yield [a.value, b.value];
      }
    },
  };
}

/**
 * Combines two or more iterab;es.
 * @param head - The first iterable.
 * @param tails - (blob) Additional iterables to add to the end of head. If
 * there are more than one, they must be of the same type.
 * @typeParam T - The item type of `head`.
 * @typeParam U - The item type of each tail.
 * @returns An iterable which yields items from the head followed by items from
 * the tail(s) in order.
 */
export function concat<T, U = T>(
  head: Iterable<T>,
  ...tails: Array<Iterable<U>>
): Iterable<T | U> {
  return {
    *[Symbol.iterator](): IterableIterator<T | U> {
      yield* head;
      for (const it of tails) {
        yield* it;
      }
    },
  };
}
