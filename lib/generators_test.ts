import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as generators from "./generators.ts";

Deno.test("randomNumbers", () => {
  const randomNumbers = generators.randomNumbers()[Symbol.iterator]();

  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
  assert(typeof randomNumbers.next().value === "number");
});

Deno.test("endlessFrom", () => {
  const id: (x: number) => number = (x) => x;
  const counting = generators.endlessFrom(id)[Symbol.iterator]();

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

Deno.test("constantValues", () => {
  const number = Math.random();
  const numberIter = generators.constant(number)[Symbol.iterator]();

  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
  assertEquals(number, numberIter.next().value);
});

Deno.test("increments", () => {
  const numberIter = generators.increments()[Symbol.iterator]();

  for (let i = 0; i < 100; i++) {
    assertEquals(numberIter.next().value, i);
  }

  const numberIterPlus3 = generators.increments(3)[Symbol.iterator]();

  for (let i = 3; i < 100; i++) {
    assertEquals(numberIterPlus3.next().value, i);
  }

  const numberIterTimes5 = generators.increments(0, 5)[Symbol.iterator]();

  for (let i = 0; i < 100; i += 5) {
    assertEquals(numberIterTimes5.next().value, i);
  }
});
