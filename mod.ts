export { LICENSE, VERSION } from "./version.ts";
export * from "./lib/transformers.ts";
export * from "./lib/combiners.ts";
export * from "./lib/reducers.ts";
export * from "./lib/types.ts";
export * from "./lib/effectors.ts";
export * as create from "./lib/generators.ts";

import * as fp from "./fp.ts";
/**
 * Curried functions. Note that only functions which take an iterable as a first
 * argument, and accept more than one argument, are curried.
 */
export const curried = fp;
