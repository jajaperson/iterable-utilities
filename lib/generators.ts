import { IterableCircular } from "./types.ts";
import { kComb } from "./internal/util.ts";

/**
 * {@link from | `from`} generator callback.
 * @typeParam T - see {@link endlessfrom | `from`}
 */
export interface FromCallback<T> {
  /**
   * {@link from | `from`} generator callback.
   * @callback FromCallback
   * @param index - The current index.
   * @returns An iterator result (as returned by `iterator.next()`)
   */
  (index: number): IteratorResult<T>;
}

/**
 * Creates an iterable from IteratorResults returned by a function.
 * @param {FromCallback} f - A function which optianally takes the index as an
 * argument and returns the next IteratorResult.
 * @typeParam T - The type of values for the returned iterable.
 * @returns An iterable containing the `value` property of the results of `f`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const upTo6 = from((index) =>
 *   index < 6 ? { value: index } : { value: index, done: true },
 * );
 *
 * for (num of upTo6) {
 *   console.log(num);
 * }
 *
 * // -> 0
 * // -> 1
 * // -> 2
 * // -> 3
 * // -> 4
 * // -> 5
 * // -> 6
 * ```
 */
export function from<T>(f: FromCallback<T>): IterableCircular<T> {
  return {
    *[Symbol.iterator]() {
      let index = 0;
      while (true) {
        const next = f(index++);
        if (next.done) return next.value;
        yield next.value;
      }
    },
  };
}

/**
 * {@link endlessFrom | `endlessFrom`} generator callback.
 * @typeParam T - see {@link endlessfrom | `endlessFrom`}
 */
export interface EndlessFromCallback<T> {
  /**
   * {@link endlessFrom | `endlessFrom`} generator callback.
   * @callback EndlessFromCallback
   * @param index - The current index.
   * @returns The next value for the iterator.
   */
  (index: number): T;
}

/**
 * Creates an endless iterable from the return values of a function.
 * @param {EndlessFromCallback} f - A function which optionally takes the index
 * as an argument and returns the next item in the iterable.
 * @typeParam T - The return type of `f`, and thus the item type of the new
 * iterator.
 * @returns An iterable containing the results of `f`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const evenNumbers = iter.create.endlessFrom(index => 2 * index);
 * const iterator = evenNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 2
 * console.log(iterator.next().value); // -> 4
 * console.log(iterator.next().value); // -> 6
 * console.log(iterator.next().value); // -> 8
 * console.log(iterator.next().value); // -> 10
 * ```
 */
export function endlessFrom<T>(f: EndlessFromCallback<T>): IterableCircular<T> {
  return {
    *[Symbol.iterator]() {
      let index = 0;
      while (true) {
        yield f(index++);
      }
    },
  };
}

/**
 * Constructs an iterable from an iterable of its results.
 * @param results - An iterable (such as an array) of results.
 * @returns - The constructed iterable.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts"
 *
 * // iter1 and iter2 are equivelant
 * const iter1 = iter.create.endlessFrom([
 *   { value: 0, done: false },
 *   { value: 1, done: false },
 *   { value: 2, done: false },
 *   { value: 3, done: true },
 * ])[Symbol.iterator]
 * const iter2 = function* () {
 *   yield 0;
 *   yield 1;
 *   yield 2;
 *   return 3;
 * }();
 *
 * console.log(iter1.next()) // -> { value: 0, done: false }
 * console.log(iter1.next()) // -> { value: 1, done: false }
 * console.log(iter1.next()) // -> { value: 2, done: false }
 * console.log(iter1.next()) // -> { value: 3, done: true }
 * ```
 */
export function fromResults<T>(
  results: Iterable<IteratorResult<T>>,
): IterableCircular<T> {
  return {
    [Symbol.iterator]() {
      const iterator = results[Symbol.iterator]();

      return {
        next(): IteratorResult<T> {
          const next = iterator.next();
          if (next.value == null) {
            return { value: undefined, done: true };
          } else {
            return next.value;
          }
        },
        [Symbol.iterator]() {
          return this;
        },
      };
    },
  };
}

/**
 * Creates an endless iterable of pseudorandom numbers.
 * @returns An iterable containing lazily calculated pseudorandom numbers.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const randomNumbers = iter.create.randomNumbers();
 * const iterator = randomNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // ~> 0.932425207964471
 * console.log(iterator.next().value); // ~> 0.5680601537274907
 * console.log(iterator.next().value); // ~> 0.8929258116004206
 * console.log(iterator.next().value); // ~> 0.2066840236433234
 * console.log(iterator.next().value); // ~> 0.4786954722155117
 * console.log(iterator.next().value); // ~> 0.5199689620612802
 * ```
 */
export function randomNumbers(): IterableCircular<number> {
  return endlessFrom(Math.random);
}

/**
 * Creates an endless iterable of a constant value.
 * @param value The value of all items in the returned iterable.
 * @returns An endless iterable of `value`.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const zeros = iter.create.constant(0);
 * const iterator = randomNumbers[Symbol.iterator]();
 *
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * console.log(iterator.next().value); // -> 0
 * ```
 */
export function constant<T>(value: T): IterableCircular<T> {
  return endlessFrom(kComb(value));
}

/**
 * Creates an endless iterable of incrementing numbers.
 * @param initial - The initial value.
 * @param step - The increment amount.
 * @returns An endless iterable of incrementing numbers.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const naturals = iter.create.increments(1);
 * const naturalsIterator = numbers[Symbol.iterator]();
 *
 * console.log(naturalsIterator.next().value); // -> 1
 * console.log(naturalsIterator.next().value); // -> 2
 * console.log(naturalsIterator.next().value); // -> 3
 * console.log(naturalsIterator.next().value); // -> 4
 * console.log(naturalsIterator.next().value); // -> 5
 * console.log(naturalsIterator.next().value); // -> 6
 *
 * const odds = iter.create.increments(1, 2);
 * const oddsIterator = odds[Symbol.iterator]();
 *
 * console.log(oddsIterator.next().value); // -> 1
 * console.log(oddsIterator.next().value); // -> 3
 * console.log(oddsIterator.next().value); // -> 5
 * console.log(oddsIterator.next().value); // -> 7
 * console.log(oddsIterator.next().value); // -> 9
 * console.log(oddsIterator.next().value); // -> 11
 * ```
 */
export function increments(initial = 0, step = 1): IterableCircular<number> {
  return endlessFrom((index) => initial + index * step);
}

/**
 * Creates an iterable over an inclusive range of numbers.
 * @param endOrStart - If no other arguments are provided, the range will go
 * from 0 until `endOrRangeStart`. Otherwise, this acts as the start of the
 * range. To stress, this is _inclusive_, in contrast to Python's
 * [`range()`](https://docs.python.org/3.10/library/stdtypes.html?highlight=range#range)
 * iterables.
 * @param end - The end of the range.
 * @param step - The amount to increment each time. Sign is ignored.
 * @returns An iterable over the range.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const range1 = iter.create.range(5);
 * console.log(...range1); // -> 0 1 2 3 4 5
 *
 * const range2 = iter.create.range(11,16);
 * console.log(...range2); // -> 11 12 13 14 15 16
 *
 * const range3 = iter.create.range(14,24,2);
 * console.log(...range3); // -> 14 16 18 20 22 24
 *
 * const range4 = iter.create.range(12, 2, 2);
 * console.log(...range4); // -> 12 10 8 6 4 2
 * ```
 */
export function range(
  endOrStart: number,
  end?: number,
  step = 1,
): IterableCircular<number> {
  const start = end ? endOrStart : 0;
  const newEnd = end ? end : endOrStart;

  step = Math.abs(step);
  const upwards = newEnd > start;
  if (!upwards) {
    step *= -1;
  }

  const shouldStop = (i: number) => upwards ? i <= newEnd : i >= newEnd;

  return {
    *[Symbol.iterator]() {
      for (let i = start; shouldStop(i); i += step) {
        yield i;
      }
    },
  };
}

/**
 * Creates an iterable over a string's char codes.
 *
 * Note that, in contrast to [`String.prototype[@@iterator]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator),
 * this does not treat astral codepoints as single characters,
 * but rather as the constituent surrogate pair.
 * Each char code is therefore between `0x0000` and `0xffff = 2¹⁶ - 1`.
 * See the example below.
 * @param str - A string to extract char codes from.
 * @returns An iterable over the char codes.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const str = "🦀💦🥱";
 * const chars = Uint16Array.from(iter.create.fromCharCodes(str));
 *
 * console.log(chars.length); // -> 6
 * console.log(chars[0].toString(16)); // -> d83e
 * console.log(chars[1].toString(16)); // -> dd80
 * console.log(chars[2].toString(16)); // -> d83d
 * console.log(chars[3].toString(16)); // -> dca6
 * console.log(chars[4].toString(16)); // -> d83e
 * console.log(chars[5].tostring(16)); // -> dd71
 * console.log("\ud83e\udd80\ud83d\udca6\ud83e\udd71"); // -> 🦀💦🥱
 * ```
 */
export function fromCharCodes(str: string): IterableCircular<number> {
  return {
    *[Symbol.iterator]() {
      let i = 0;

      while (true) {
        const c = str.charCodeAt(i);

        if (c !== c) {
          return;
        } else {
          yield c;
        }

        i++;
      }
    },
  };
}

/**
 * Creates an iterable over a string's chars.
 *
 * Note that, in contrast to [`String.prototype[@@iterator]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/@@iterator),
 * this does not treat astral codepoints as single characters,
 * but rather as the constituent surrogate pair.
 * Each char code is therefore between `0x0000` and `0xffff = 2¹⁶ - 1`.
 * See the example below.
 * @param str - A string to extract char codes from.
 * @returns An iterable over the char codes.
 * @example
 * ```ts
 * import * as iter from "https://deno.land/x/iter/mod.ts";
 *
 * const str = "🦀💦🥱";
 * const chars = iter.create.fromChars(str)[Symbol.iterator]()
 *
 * console.log(chars.next().value === "\ud83e"); // -> true
 * console.log(chars.next().value === "\udd80"); // -> true
 * console.log(chars.next().value === "\ud83d"); // -> true
 * console.log(chars.next().value === "\udca6"); // -> true
 * console.log(chars.next().value === "\ud83e"); // -> true
 * console.log(chars.next().value === "\udd71"); // -> true
 * console.log("\ud83e\udd80\ud83d\udca6\ud83e\udd71"); // -> 🦀💦🥱
 * ```
 */
export function fromChars(str: string): IterableCircular<string> {
  return {
    *[Symbol.iterator]() {
      let i = 0;

      while (true) {
        const c = str.charAt(i);

        if (c !== c) {
          return;
        } else {
          yield c;
        }

        i++;
      }
    },
  };
}
