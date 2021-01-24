import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as transformers from "./transformers.ts";
// import s

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
