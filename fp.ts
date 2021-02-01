import { curryIterableMethod } from "./lib/internal/util.ts";
import * as combinators from "./lib/combiners.ts";
import * as reducers from "./lib/reducers.ts";
import * as transformers from "./lib/transformers.ts";

// Combinators
export const pair = curryIterableMethod(combinators.pair);
export const concat = curryIterableMethod(combinators.concat);

// Reducers
export const reduce = curryIterableMethod(reducers.reduce);
export const some = curryIterableMethod(reducers.some);
export const includes = curryIterableMethod(reducers.includes);
export const every = curryIterableMethod(reducers.every);
export const find = curryIterableMethod(reducers.find);

// Transformers
export const map = curryIterableMethod(transformers.map);
export const take = curryIterableMethod(transformers.take);
export const until = curryIterableMethod(transformers.until);
export const filter = curryIterableMethod(transformers.filter);
export const indexedPairs = transformers.indexedPairs;
export const chunkify = curryIterableMethod(transformers.chunkify);
export const remember = transformers.rememeber;

export * as create from "./lib/generators.ts";
