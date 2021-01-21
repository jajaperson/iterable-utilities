/**
 * Creates a function which always returns the same value.
 * @param value - The value to be returned
 * @typeParam T - The type of the constant
 * @internal
 */
export function kComb<T>(value: T): () => T {
  return () => value;
}

/**
 * Strips an iterable of all other properties so it only contains the iterator
 * symbol
 * @param it - The iterator to be stripped.
 * @typeParam T - The iterable's item type.
 * @returns An iterable object stripped of all other properties.
 * @internal
 */
export function stripIterable<T>(it: Iterable<T>): Iterable<T> {
  return {
    [Symbol.iterator]: it[Symbol.iterator],
  };
}
