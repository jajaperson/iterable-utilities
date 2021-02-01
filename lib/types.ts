/**
 * Generic predicate callback.
 * @typeParam T - Type of value to be predicated.
 */
export interface PredicateCallback<T> {
  /**
   * Generic predicate callback.
   * @callback PredicateCallback
   * @param value - The value being predicated.
   * @returns The predicate result.
   */
  (value: T): boolean;
}

/**
 * Iterable predicate callback.
 * @typeParam T - Type of value to be predicated.
 */
export interface IterablePredicateCallback<T> {
  /**
   * Iterable predicate callback.
   * @callback IterablePredicateCallback
   * @param value - The value of the item being predicated.
   * @param index - The index of the item being predicated.
   * @param it - The iterable.
   * @returns The predicate result.
   */
  (value: T, index: number, it: Iterable<T>): boolean;
}

/**
 * The same as the `Iterable` type, but the iterator implementation is iterable.
 * @typeParam T - Type of items in the iterable.
 */
export interface IterableCircular<T> extends Iterable<T> {
  [Symbol.iterator](): IterableIterator<T>;
}
