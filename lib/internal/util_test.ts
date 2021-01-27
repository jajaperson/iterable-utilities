import {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as util from "./util.ts";

Deno.test("kComb", () => {
  assertEquals(util.kComb("a")(), "a");
});

Deno.test("stripIterable", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const stripped = util.stripIterable(arr);
  assertStrictEquals(arr[Symbol.iterator], stripped[Symbol.iterator]);
  assertNotEquals(arr, stripped);

  const it1 = arr[Symbol.iterator]();
  const it2 = arr[Symbol.iterator]();
  for (let i = 0; i < arr.length; i++) {
    assertEquals(it1.next(), it2.next());
  }
});
