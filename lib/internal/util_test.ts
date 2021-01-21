import { assertEquals } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as util from "./util.ts";

Deno.test("kComb", () => {
  assertEquals(util.kComb("a")(), "a");
});
