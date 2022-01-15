import { curryIterFunction } from "./lib/internal/util.ts";
import * as combinators from "./lib/combiners.ts";
import * as reducers from "./lib/reducers.ts";
import * as transformers from "./lib/transformers.ts";
import * as effectors from "./lib/effectors.ts";

// Combinators
export const pair = curryIterFunction(combinators.pair);
export const concat = curryIterFunction(combinators.concat);

// Reducers
export const reduce = curryIterFunction(reducers.reduce);
export const some = curryIterFunction(reducers.some);
export const includes = curryIterFunction(reducers.includes);
export const every = curryIterFunction(reducers.every);
export const find = curryIterFunction(reducers.find);
export const sum = reducers.sum;
export const product = reducers.product;
export const norm = reducers.norm;

// Transformers
export const map = curryIterFunction(transformers.map);
export const take = curryIterFunction(transformers.take);
export const until = curryIterFunction(transformers.until);
export const filter = curryIterFunction(transformers.filter);
export const indexedPairs = transformers.indexedPairs;
export const chunkify = curryIterFunction(transformers.chunkify);
export const remember = transformers.rememeber;
export const flat = curryIterFunction(transformers.flat)
export const completeFlat = transformers.completeFlat;

// Effectors
export const forEach = curryIterFunction(effectors.forEach);
export const lazyObserver = curryIterFunction(effectors.lazyObserver);

export * as create from "./lib/generators.ts";
