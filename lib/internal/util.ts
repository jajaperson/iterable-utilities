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

interface IterableMethod<T, U, Args extends unknown[]> {
  (it: Iterable<T>, ...args: Args): U;
}

interface CurriedIterableMethod<T, U, Args extends unknown[]> {
  (...args: Args): (it: Iterable<T>) => U;
}

/**
 * Curries a iterable method for partial calling.
 * @param method - The method to curry.
 * @typeParam T - The iterable's item type.
 * @typeParam U - The functions return type.
 * @typeParam Args - The other argument types for `method` as a tuple.
 * @returns A curried `method`.
 * @internal
 */
export function curryIterableMethod<T, U, Args extends unknown[]>(
  method: IterableMethod<T, U, Args>,
): CurriedIterableMethod<T, U, Args> {
  return (...args) => (it) => method(it, ...args);
}
