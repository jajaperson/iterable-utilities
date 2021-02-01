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

/**
 * Type for all iterable methods in the library.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the method.
 * @typeParam Args - The rest type of other method arguments.
 */
export interface IterableMethod<T, U, Args extends unknown[]> {
  (it: Iterable<T>, ...args: Args): U;
}

/**
 * Alias for an `IterableMethod` which accepts no arguments accept an iterable.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the method.
 */
export type UniaryIterableMethod<T, U> = IterableMethod<T, U, []>;

/**
 * A curried version of an `IterableMethod`. All methods in `fp.ts` are either
 * of type `CurriedIterableMethod` or `UniaryIterableMethod`.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the method.
 * @typeParam Args - The rest type of other method arguments.
 */
export interface CurriedIterableMethod<T, U, Args extends unknown[]> {
  (...args: Args): UniaryIterableMethod<T, U>;
}

/**
 * An alias for a special case of `UniaryIterableMethod` for when the result is
 * an iterable.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The type of items in the returned iterable.
 */
export type UniaryIterableTransformer<T, U> = UniaryIterableMethod<
  T,
  Iterable<U>
>;
