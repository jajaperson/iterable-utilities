import {
  assertEquals,
  assertNotEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as util from "./util.ts";
import { take } from "../../mod.ts";

Deno.test("kComb", () => {
  assertEquals(util.kComb("a")(), "a");
});

Deno.test("stripIterable", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const stripped = util.stripIterable(arr);

  assertEquals(arr, [...stripped]);
});

Deno.test("curryIterFunction", () => {
  const curriedTake = util.curryIterFunction(take);
  const take5 = curriedTake(5);

  assertEquals(typeof take5, "function");
  assertEquals([...take5([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])].length, 5);
});

Deno.test("isIterable", () => {
  assertEquals(util.isIterable([]), true);
  assertEquals(util.isIterable({}), false);
  assertEquals(util.isIterable(42), false);
});
