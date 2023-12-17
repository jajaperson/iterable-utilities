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
 * Iterable type predicate callback.
 * @typeParam T - Type of value to be predicated.
 * @typeParam S - Type of value to be narrowed to.
 */
export interface IterableTypePredicateCallback<T, S extends T> {
  /**
   * Iterable type predicate callback.
   * @callback IterableTypePredicateCallback
   * @param value - The value of the item being predicated.
   * @param index - The index of the item being predicated.
   * @param it - The iterable.
   * @returns The narrowed predicate result.
   */
  (value: T, index: number, it: Iterable<T>): value is S;
}

/**
 * The same as the `Iterable` type, but the iterator implementation is iterable.
 * @typeParam T - Type of items in the iterable.
 */
export interface IterableCircular<T> extends Iterable<T> {
  [Symbol.iterator](): IterableIterator<T>;
}

/**
 * An iterator that defines a peeking mechanism.
 * Inspired by Rust's [`std::Iter::Peekable`](https://doc.rust-lang.org/std/iter/struct.Peekable.html)
 * @typeParam T - Type of items in the iterator.
 */
export interface Peekable<T> extends IterableIterator<T> {
  /** Peeks the next item of the iterator without consuming it. */
  peek(): IteratorResult<T>;
}

/**
 * Type for all iterable functions in the library.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the function.
 * @typeParam Args - The rest type of other function arguments.
 */
export interface IterFunction<T, U, Args extends unknown[]> {
  (it: Iterable<T>, ...args: Args): U;
}

/**
 * Alias for an `IterFunction` which accepts no arguments accept an iterable.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the function.
 */
export type UniaryIterFunction<T, U> = IterFunction<T, U, []>;

/**
 * A curried version of an `IterFunction`. All non-generator functions in
 * `fp.ts` are either of type `IterFunction` or `UniaryIterFunction`.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The return type of the function.
 * @typeParam Args - The rest type of other function arguments.
 */
export interface CurriedIterFunction<T, U, Args extends unknown[]> {
  (...args: Args): UniaryIterFunction<T, U>;
}

/**
 * An alias for a special case of `UniaryIterTransformer` for when the result is
 * an iterable.
 * @typeParam T - The type of items in the iterable argument.
 * @typeParam U - The type of items in the returned iterable.
 */
export type UniaryIterTransformer<T, U> = UniaryIterFunction<
  T,
  Iterable<U>
>;
