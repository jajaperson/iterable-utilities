import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as combinators from "./combinators.ts";

Deno.test("pair", () => {
  const testArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // Array.prototype.reverse doesn't affect the iterator
  const revArr = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const pairs = combinators.pair(testArr, revArr);

  for (const [a, b] of pairs) {
    assertEquals(a + b, 9);
  }
});

Deno.test("concat", () => {
  const arr1a = [0, 1, 2, 3, 4];
  const arr1b = [5, 6, 7, 8, 9];
  const arr1c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals([...combinators.concat(arr1a, arr1b)], arr1c);

  const arr2a = [1, 1, 0, 1];
  const arr2b = [true, false, true];
  const arr2c = [1, 1, 0, 1, true, false, true];
  assertEquals([...combinators.concat(arr2a, arr2b)], arr2c);

  const arr3a = [true, true, false];
  const arr3c = [1, 1, 0, 1, true, false, true, true, true, false];
  assertEquals([...combinators.concat(arr2a, arr2b, arr3a)], arr3c);
});
