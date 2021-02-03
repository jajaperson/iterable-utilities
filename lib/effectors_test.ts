import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as effectors from "./effectors.ts";
import { take } from "./transformers.ts";
import { increments } from "./generators.ts";

Deno.test("forEach", () => {
  const naturalsTo5 = take(increments(1), 5);
  effectors.forEach(naturalsTo5, (x, i, it) => {
    assertEquals(x - i, 1);
    assertEquals(it[Symbol.iterator]().next().value, 1);
  });
});

Deno.test("lazyObserver", () => {
  let lastRecieved = NaN;
  const naturals = increments(1);
  const observed = effectors.lazyObserver(naturals, (x, i, it) => {
    lastRecieved = x;
    assertEquals(x - i, 1);
    assertEquals(it[Symbol.iterator]().next().value, 1);
  });
  const iterator = observed[Symbol.iterator]();

  iterator.next();
  assertEquals(lastRecieved, 1);
  iterator.next();
  assertEquals(lastRecieved, 2);
  iterator.next();
  assertEquals(lastRecieved, 3);
});
