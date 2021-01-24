import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as reducers from "./reducers.ts";

Deno.test("reduce", () => {
  const add = (x: number, y: number) => x + y;
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals(reducers.reduce(arr, add, 0), arr.reduce(add));

  assertEquals(
    reducers.reduce(
      arr,
      (_, x) => x,
      0,
      (x) => x === 5,
    ),
    5,
  );
});

Deno.test("some", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals(
    reducers.some(arr, (x) => x === -1),
    false,
  );
  assertEquals(
    reducers.some(arr, (x) => x === 1),
    true,
  );

  [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
  ].forEach((i) =>
    assertEquals(
      reducers.some(arr, (x) => x === i),
      arr.some((x) => x === i),
    ),
  );
});

Deno.test("all", () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  assertEquals(
    reducers.every(arr, (x) => x > 0),
    false,
  );
  assertEquals(
    reducers.every(arr, (x) => x > -1),
    true,
  );

  arr.forEach((i) =>
    assertEquals(
      reducers.every(arr, (x) => x > i),
      arr.every((x) => x > i),
    ),
  );
});

Deno.test("find", () => {
  assertEquals(
    reducers.find([0], (x) => x > 0),
    undefined,
  );
  assertEquals(
    reducers.find([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], (x) => x < 4),
    3,
  );
});

Deno.test("findIndex", () => {
  assertEquals(
    reducers.findIndex([0], (x) => x > 0),
    -1,
  );
  assertEquals(
    reducers.findIndex([9, 8, 7, 6, 5, 4, 3, 2, 1, 0], (x) => x < 4),
    6,
  );
});
