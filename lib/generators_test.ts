import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as generators from "./generators.ts";

Deno.test("constantValues", () => {
  const number = Math.random();
  const numberIter = generators.constant(number);

  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
});

Deno.test("randomNumbers", () => {
  const randomNumbers = generators.randomNumbers();

  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
});

Deno.test("from", () => {
  const id: (x: number) => number = (x) => x;
  const counting = generators.from(id);

  for (let i = 0; i < 20; i++) {
    assertEquals(i, counting.next().value);
  }
});
