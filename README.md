# Iter [![Version](https://img.shields.io/github/v/tag/jajaperson/iterable-utilities?label=version)](https://github.com/jajaperson/iterable-utilities/releases) [![Build Status](https://img.shields.io/github/workflow/status/jajaperson/iterable-utilities/Test%20Deno%20Module)](https://github.com/jajaperson/iterable-utilities/actions?query=workflow%3A%22Test+Deno+Module%22)

A bunch of utilities for working with iterables, many inspired by the native
array methods.

Iterables are great for doing things you would normally do with arrays,
_lazily_, meaning you only compute what you need. The aim of this module is to
provide lazy iterable alternatives to javascript's native array methods, as well
as a few quality-of-life iterable utilities.

## Installation

The module is currently hosted on [deno.land/x/](https://deno.land/x/).

```ts
import * as iter from "https://deno.land/x/iter/mod.ts";
// or with a version
import * as iter from "https://deno.land/x/iter@v0.2.0/mod.ts";
```

## Conventions

All functions which return iterables (generators, transformers, and combinators)
return the `IterableIterator` type, meaning they return an iterator which itself
is iterable. This means both of these work.

```ts
import * as iter from "https://deno.land/x/iter/mod.ts";

const randomNumbers = iter.create.randomNumbers();
// As iterator
console.log(randomNumbers.next().value);
// Or as iterable
console.log(randomNumbers[Symbol.iterator]().next().value);
// Note these will still generate two different values.
```

## API

API documentation can be found
[here](https://doc.deno.land/https/deno.land/x/iter/mod.ts)

## `Array.prototype` parity completeness

- [x] `concat`
- [ ] `entries`
- [x] `every`
- [x] `filter`
- [x] `find`
- [x] `findIndex`
- [ ] `includes`
- [x] `map`
- [x] `reduce`
- [x] `some`

### Currently not being considered

- [ ] `copyWithin`
- [ ] `fill`
- [ ] `flat`
- [ ] `flatMap`
- [ ] `forEach`
- [ ] `indexOf`
- [ ] `join`
- [ ] `lastIndexOf`
- [ ] `pop`
- [ ] `push`
- [ ] `reduceRight`
- [ ] `reverse`
- [ ] `shift`
- [ ] `slice`
- [ ] `sort`
- [ ] `splice`
- [ ] `toLocaleString`
- [ ] `toString`
- [ ] `unshift`
