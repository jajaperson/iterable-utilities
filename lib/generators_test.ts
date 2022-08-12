import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as generators from "./generators.ts";
import { sum } from "./reducers.ts";

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

Deno.test("range", () => {
  assertEquals(sum(generators.range(5)), 15);
  assertEquals(sum(generators.range(5, 9)), 35);
  assertEquals(sum(generators.range(5, 10, 2)), 21);
});

Deno.test("fromResults", () => {
  const results = [
    { value: 0, done: false },
    { value: 1, done: false },
    { value: 2, done: false },
    { value: 3, done: true },
  ];
  const iter1 = generators.fromResults(results)[Symbol.iterator]();
  const iter2 = function* () {
    yield 0;
    yield 1;
    yield 2;
    return 3;
  }();

  let done = false;
  while (!done) {
    const r1 = iter1.next();
    const r2 = iter2.next();
    assertEquals(r1, r2);
    done = r1.done || false;
  }
});

Deno.test("fromCharCodes", () => {
  const str = "\u0077\u006f\u0074\u0020\ud83e\udee5\u003f";
  const iter = generators.fromCharCodes(str)[Symbol.iterator]();

  assertEquals(iter.next().value, 0x0077);
  assertEquals(iter.next().value, 0x006f);
  assertEquals(iter.next().value, 0x0074);
  assertEquals(iter.next().value, 0x0020);
  assertEquals(iter.next().value, 0xd83e);
  assertEquals(iter.next().value, 0xdee5);
  assertEquals(iter.next().value, 0x003f);
});

Deno.test("fromChars", () => {
  const str = "🦀💦🥱";
  const chars = generators.fromChars(str)[Symbol.iterator]();

  assertEquals(chars.next().value, "\ud83e");
  assertEquals(chars.next().value, "\udd80");
  assertEquals(chars.next().value, "\ud83d");
  assertEquals(chars.next().value, "\udca6");
  assertEquals(chars.next().value, "\ud83e");
  assertEquals(chars.next().value, "\udd71");
});
