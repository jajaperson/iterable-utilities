import { assertArrayIncludes } from "https://deno.land/std@0.84.0/testing/asserts.ts";
import * as mod from "./mod.ts";
import * as fp from "./fp.ts";

Deno.test("All functions are available in functional programming version", () => {
  assertArrayIncludes(["curried", ...Object.keys(fp)], Object.keys(mod));
});
