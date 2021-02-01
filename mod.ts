export { LICENSE, VERSION } from "./version.ts";
export * from "./lib/transformers.ts";
export * from "./lib/combiners.ts";
export * from "./lib/reducers.ts";
export * from "./lib/types.ts";
export * as create from "./lib/generators.ts";
/**
 * Curried methods. Note that only methods which take an iterable as a first
 * argument, and accept more than one argument, are curried.
 */
export * as curried from "./fp.ts";
