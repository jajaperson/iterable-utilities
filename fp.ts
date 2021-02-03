import { curryIterFunction } from "./lib/internal/util.ts";
import * as combinators from "./lib/combiners.ts";
import * as reducers from "./lib/reducers.ts";
import * as transformers from "./lib/transformers.ts";

// Combinators
export const pair = curryIterFunction(combinators.pair);
export const concat = curryIterFunction(combinators.concat);

// Reducers
export const reduce = curryIterFunction(reducers.reduce);
export const some = curryIterFunction(reducers.some);
export const includes = curryIterFunction(reducers.includes);
export const every = curryIterFunction(reducers.every);
export const find = curryIterFunction(reducers.find);

// Transformers
export const map = curryIterFunction(transformers.map);
export const take = curryIterFunction(transformers.take);
export const until = curryIterFunction(transformers.until);
export const filter = curryIterFunction(transformers.filter);
export const indexedPairs = transformers.indexedPairs;
export const chunkify = curryIterFunction(transformers.chunkify);
export const remember = transformers.rememeber;

export * as create from "./lib/generators.ts";
