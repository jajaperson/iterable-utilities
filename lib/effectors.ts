/**
 * @link forEach | `forEach`} callback.
 * @typeParam T - See {@link forEach}
 */
export interface ForEachCallback<T> {
  /**
   * {@link forEach | `forEach`} callback.
   * @callback ForEachCallback
   * @param item - The current item to be mapped.
   * @param index - The index of the item.
   * @param it - The iterable.
   */
  (item: T, index: number, it: Iterable<T>): void;
}

/**
 * Performs the specified action for each item in an iterable. Non-lazy.
 * @param it - The iterable being looped over.
 * @param {ForEachCallback} f - A function that accepts up to three arguments. forEach
 * calls the callbackfn function one time for each item in the iterable.
 * @typeParam T - The type of items in `it`.
 *
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const naturals = iter.create.increments(1);
 * const first6 = iter.take(naturals, 6);
 * iter.forEach(first6, x => console.log(x));
 *
 * // -> 1
 * // -> 2
 * // -> 3
 * // -> 4
 * // -> 5
 * // -> 6
 * ```
 */
export function forEach<T>(it: Iterable<T>, f: ForEachCallback<T>): void {
  let index = 0;
  for (const item of it) f(item, index++, it);
}
