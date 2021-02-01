# Iter [![Version](https://img.shields.io/github/v/tag/jajaperson/iterable-utilities?label=version)](https://github.com/jajaperson/iterable-utilities/releases) [![Build Status](https://img.shields.io/github/workflow/status/jajaperson/iterable-utilities/Test%20Deno%20Module)](https://github.com/jajaperson/iterable-utilities/actions?query=workflow%3A%22Test+Deno+Module%22)

A bunch of utilities for working with iterables, many inspired by the native
array methods.

Iterables are great for doing things you would normally do with arrays,
_lazily_, meaning you only compute what you need. The aim of this module is to
provide lazy iterable alternatives to javascript's native array methods, as well
as a few quality-of-life iterable utilities.

## Usage

The module is currently hosted on [deno.land/x/](https://deno.land/x/).

```ts
import * as iter from "https://deno.land/x/iter/mod.ts";
// or with a version
import * as iter from "https://deno.land/x/iter@v2.2.0/mod.ts";

const naturals = iter.create.increments(1);
const odds = iter.filter(naturals, (n) => n % 2 === 1);

for (const num of iter.take(odds, 5)) {
  console.log(num);
}
```

### Functional programming

An alternative module is provided for functional programming styles, with a
sensible level of currying.

```ts
import * as iter from "https://deno.land/x/iter/fp.ts";
// or with a version
import * as iter from "https://deno.land/x/iter@v2.2.0/fp.ts";

const naturals = iter.create.increments(1);
const filterOdds = iter.filter<number>((n) => n % 2 === 1);
const odds = filterOdds(naturals);

for (const num of iter.take(5)(odds)) {
  console.log(num);
}
```

These curried methods are also available in the main `mod.ts` through
`iter.curried`.

## API

Full API documentation can be found
[here](https://doc.deno.land/https/deno.land/x/iter/mod.ts)

## `Array.prototype` parity completeness

- [x] `concat`
- [x] `entries` (as `indexedPairs`)
- [x] `every`
- [x] `filter`
- [x] `find`
- [x] `findIndex`
- [x] `includes`
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
