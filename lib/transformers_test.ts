import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as transformers from "./transformers.ts";
import { stripIterable } from "./internal/util.ts";

Deno.test("take", () => {
  const testArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const testIter = testArray[Symbol.iterator]();

  assertEquals(testArray.slice(0, 5), [...transformers.take(testIter, 5)]);
});

Deno.test("map", () => {
  const id: (x: number) => number = (x) => x;

  const testIter = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const testIterClone = transformers.map(testIter, id);

  assertEquals([...testIter], [...testIterClone]);
});

Deno.test("filter", () => {
  const even = (x: number) => x % 2 === 0;

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (const num of transformers.filter(numbers, even)) {
    assertEquals(even(num), true);
  }
});

Deno.test("cut", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const cutNumbers = [...transformers.until(numbers, (n) => n === 5)];
  const cutNumbersExclusive = [
    ...transformers.until(numbers, (n) => n === 5, false),
  ];

  assertEquals(cutNumbers[cutNumbers.length - 1], 5);
  assertEquals(cutNumbersExclusive[cutNumbersExclusive.length - 1], 4);
});

Deno.test("indexedPairs", () => {
  const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1];
  [...transformers.indexedPairs(numbers)].forEach(([i, v]) => {
    assertEquals(i + v, 9);
  });
});

Deno.test("chunkify", () => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  assertThrows(() => {
    transformers.chunkify(numbers, 0);
  });
  assertThrows(() => {
    transformers.chunkify(numbers, -5);
  });

  for (const [x, y] of transformers.chunkify(numbers, 2)) {
    assertEquals(x + y, 2 * x + 1);
  }

  for (const [x, y] of transformers.chunkify(stripIterable(numbers), 2)) {
    assertEquals(x + y, 2 * x + 1);
  }
});
