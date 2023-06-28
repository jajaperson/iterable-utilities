export { LICENSE, VERSION } from "./version.ts";

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
export const every = curryIterFunction(reducers.every);
export const includes = curryIterFunction(reducers.includes);
export const find = curryIterFunction(reducers.find);
export const findIndex = curryIterFunction(reducers.findIndex);
export const sum = reducers.sum;
export const average = reducers.average;
export const product = reducers.product;
export const norm = reducers.norm;

// Transformers
export const map = curryIterFunction(transformers.map);
export const flatMap = curryIterFunction(transformers.flatMap);
export const take = curryIterFunction(transformers.take);
export const drop = curryIterFunction(transformers.drop);
export const until = curryIterFunction(transformers.until);
export const filter = curryIterFunction(transformers.filter);
export const indexedPairs = transformers.indexedPairs;
export const chunkify = curryIterFunction(transformers.chunkify);
export const remember = transformers.remember;
export const flat = curryIterFunction(transformers.flat);
export const completeFlat = transformers.completeFlat;
export const fuse = transformers.fuse;
export const peekable = transformers.peekable;

// Effectors
export const forEach = curryIterFunction(effectors.forEach);
export const lazyObserver = curryIterFunction(effectors.lazyObserver);

export * as create from "./lib/generators.ts";
