# Iter [![Version](https://img.shields.io/github/v/tag/jajaperson/iterable-utilities?label=version)](https://github.com/jajaperson/iterable-utilities/releases) [![Build Status](https://img.shields.io/github/workflow/status/jajaperson/iterable-utilities/Test%20Deno%20Module)](https://github.com/jajaperson/iterable-utilities/actions?query=workflow%3A%22Test+Deno+Module%22)

A bunch of utilities for working with iterables, many inspired by the native
array methods.

Iterables are great for doing things you would normally do with arrays,
_lazily_, meaning you only compute what you need. The aim of this module is to
provide lazy iterable alternatives to javascript's native array methods, as well
as a few quality-of-life iterable utilities.

This library opts for standalone functions rather than an extended iterable type
for the sake of simplicity and being lightweight. If an extension of the
iterable type which provides these features as methods is what you are after,
see [IxJS](https://ghub.io/ix) (for Deno this can be imported via
[skypack](https://skypack.dev)).

## Usage

### Deno

The module is currently hosted on <https://deno.land/x/iter>.

```ts
import * as iter from "https://deno.land/x/iter/mod.ts";
// or with a version
import * as iter from "https://deno.land/x/iter@v2.6.0/mod.ts";

const naturals = iter.create.increments(1);
const odds = iter.filter(naturals, (n) => n % 2 === 1);

for (const num of iter.take(odds, 5)) {
  console.log(num);
}
```

### NPM

You can use this as an npm package too.

```sh
$ npm install --save iterable-utilities
```

### Functional programming

An alternative module is provided for functional programming styles, with a
sensible level of currying.

```ts
import * as iter from "https://deno.land/x/iter/fp.ts";
// or with a version
import * as iter from "https://deno.land/x/iter@v2.6.0/fp.ts";

const naturals = iter.create.increments(1);
const filterOdds = iter.filter<number>((n) => n % 2 === 1);
const odds = filterOdds(naturals);

for (const num of iter.take(5)(odds)) {
  console.log(num);
}
```

These curried functions are also available in the main `mod.ts` through
`iter.curried`.

#### Chaining operations (composition)

To chain multiple operations together, partially applied curried iter functions
can be composed together. Generic composition functions are notoriously
difficult to implement in TypeScript, there are a few modules which provide
solutions.

If you can deal with a slightly alien curried syntax,
[`copb`](https://github.com/jajaperson/copb) allows for type-safe currying of an
unlimited number of functions.

<!-- prettier-ignore-start -->

```ts
import * as iter from "https://deno.land/x/iter/fp.ts";
import { c, p } from "https://deno.land/x/copb/mod.ts";

const pipeline = c(
  p(iter.map<number>(x => x * 100)) // Only needed type annotation, the rest is inferred.
   (iter.map(Math.floor))
   (iter.filter(x => x % 3 === 0))
   (iter.take(30))
   (iter.reduce(
     (str, x) => str + x, ""
   ))
   (console.log)
);

pipeline(iter.create.randomNumbers());
// ~> 661299633996843372696936915845169485496993302427362472690
```

<!-- prettier-ignore-end -->

If that isn't your thing,
[`compose`](https://github.com/KSXGitHub/deno-compose) achieves a similar thing
in the familar JavaScript syntax by providing 64 type overloads. This does limit
the number of functions which can be composed in one go, but if you reach that
point you should probably be breaking your code into smaller functions anyway.

## API

Full API documentation can be found
[here](https://deno.land/x/iter/mod.ts)

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
- [x] `forEach`
- [x] `flat`
- [ ] `flatMap`

### Currently not being considered

- [ ] `copyWithin`
- [ ] `fill`
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

## Internal nomenclature

The functions are organised into the following categories. Note that when
importing from `mod.ts`, all are included in the same namespace except for
`generators`, which is exported under `create`.

- `generators` create new iterables from non-iterable arguments (or none at
  all).
- `transformers` transform one iterable to another.
- `combiners` transform multiple iterables to a single iterable.
- `reducers` reduce an iterable into a single, non-iterabe value.
- `effectors` are used for side effects and do not alter an iterable.
