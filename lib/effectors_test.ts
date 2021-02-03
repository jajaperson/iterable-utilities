import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as iter from "../mod.ts";

Deno.test("forEach", () => {
  const naturalsTo5 = iter.take(iter.create.increments(1), 5);
  iter.forEach(naturalsTo5, (x, i, it) => {
    assertEquals(x - i, 1);
    assertEquals(it[Symbol.iterator]().next().value, 1);
  });
});
