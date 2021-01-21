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

Deno.test("endlessFrom", () => {
  const id: (x: number) => number = (x) => x;
  const counting = generators.endlessFrom(id);

  for (let i = 0; i < 20; i++) {
    assertEquals(i, counting.next().value);
  }
});

Deno.test("from", () => {
  const terminateAfter6 = generators.from((index) =>
    index > 6 ? { value: undefined, done: true } : { value: index }
  );
  assertEquals([...terminateAfter6].length, 7);
});
