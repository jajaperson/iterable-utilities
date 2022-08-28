# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Curried exports of all functions (I've been forgetting to update these, so I
  also added a test to remind me to do so)
- Alternate npm entry point for fp.
- Testing now includes [`copb`](https://deno.land/x/copb) compatibility
  (including the npm version).

### Changed

- (:warning: breaking) Fixed typo in `iter.remember()` (originally
  `iter.rememeber()`)
- Point docs to [deno.land](deno.land/x/iter/mod.ts) rather than
  [doc.deno.land](https://doc.deno.land/https://deno.land/x/iter/mod.ts)

## [2.6.0] - 2020-08-24

### Added

- `iter.peekable()` inspired by Rust's
  [`std::iter::Peekable`](https://doc.rust-lang.org/std/iter/struct.Peekable.html).

### Changed

- (docs) Added special note on the inclusivity of `create.range()`.

## [2.5.0] - 2020-08-12

### Added

- `iter.create.fromChars()` and `iter.create.fromCharCodes()` for iterating over
  UTF-16 character units and codes respectively.

## [2.4.2] - 2020-07-30

### Changed

- Another attempt to fix the NPM release (debugging actions can be awful
  sometimes).

## [2.4.1] - 2020-07-30

### Changed

- Fixed NPM release action.

## [2.4.0] - 2020-07-30

### Added

- NPM support :tada:
- Transformers
  - `iter.flat()` (like `Array.prototype.flat`)
  - `iter.completeFlat()` for flattening an iterable completely.
  - `iter.fuse()` for ignoring values after and including the return.
- Generators
  - `iter.create.fromResults()` for creating iterators directly from results

## [2.3.0] - 2021-02-03

### Added

- Effectors
  - `iter.forEach()` (like `Array.prototype.forEach`)
  - `iter.lazyObserver()` for observing each yielded value lazily.
- Generators
  - `iter.create.range()` for creating an iterable over a range of numbers.
- Reducers
  - `iter.sum()` for getting the sum of an iterable.
  - `iter.product()` for getting the product of an iterable.
  - `iter.norm()` for getting the vector norm of an iterable.

## [2.2.1] - 2021-02-03

### Added

- Several types for `iter` functions.
  - `IterFunction`
  - `UniaryIterFunction`
  - `CurriedIterFunction`
  - `UniaryIterTransformer`
- Documentation on chaining/composition.

### Changed

- All documentation which previously referred to the functions of this library
  as methods now says function.

## [2.2.0] - 2021-02-01

### Added

- An `IterableCircular` type for iterables using generator functions.
- A alternative module with a sensible level of currying, `fp.ts`. This is also
  exported as `curried` from the main `mod.ts`.

### Changed

- Everything which used to return an `Iterable` now returns the
  `IterableCircular` type. This doesn't break anything because these types are
  compatible.

## [2.1.0] - 2021-01-30

### Added

- Export `LICENSE` from `version.ts` and `mod.ts`
- Transformers
  - `iter.remember()` so that an iterable can be iterated over multiple times
    and be guaranteed to yield the same results.
- Examples to documentation.

## [2.0.0] - 2021-01-28

### Added

- Transformers
  - `iter.chunkify` inspired by
    [@sindresorhus/chunkify](https://ghub.io/@sindresorhus/chunkify)

### Changed

- Everything which used to return the `IterableIterator` type now returns the
  `Iterable` type. This also means that returned iterables are not use-once.
- Iterables are no longer stripped before being passed to callbacks.

## [1.0.0] - 2021-01-27

### Added

- Reducers
  - `iter.find()` (like `Array.prototype.find`)
  - `iter.findIndex()` (like `Array.prototype.findIndex`)
  - `iter.includes()` (like `Array.prototype.includes`)
- Transformers
  - `iter.filter()` (like `Array.prototype.filter`)
  - `iter.until()` to cut off an iterable when a predicate returns true
  - `iter.indexedPairs` (like `Array.prototype.entries`)

## [0.2.0] - 2021-01-22

### Added

- More unit tests.
- Better documentation via [TSDoc](https://tsdoc.org)
- Reducers
  - `iter.reduce()` (like `Array.prototype.reduce`)
  - `iter.some()` (like `Array.prototype.some`)
  - `iter.every()` (like `Array.prototype.every`)
- Generators
  - `iter.create.increments()` to create an endless incremementing interator.

### Changed

- Clear separation of internal API.
- Generators
  - Old `iter.create.from()` is now `iter.create.endlessFrom()`.
    `iter.create.from()` now creates an iterator from a function returning
    iterator result objects.

## [0.1.1] - 2021-01-20

### Added

- Unit tests

### Changed

- `iter.pair()` fixed so it doesn't just give the same value.

## [0.1.0] - 2021-01-20

### Added

- Generators
  - `iter.create.from()` for creating iterators from functions.
  - `iter.create.constant()` for creating an endless iterable of the same value.
  - `iter.create.randomNumbers()` for creating an endless iterable of
    pseudorandom numbers.
- Transformers
  - `iter.map()` (like `Array.prototype.map`)
  - `iter.take()` for taking the first _n_ items of an iterable.
- Combinators
  - `iter.pair()` for zipping two iterables.
  - `iter.concat` (like `Array.prototype.concat`)

[unreleased]: https://github.com/jajaperson/iterable-utilities/compare/v2.6.0...HEAD
[0.2.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v0.2.0
[0.1.1]: https://github.com/jajaperson/iterable-utilities/releases/tag/v0.1.1
[0.1.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v0.1.0
[1.0.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v1.0.0
[2.0.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.0.0
[2.1.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.1.0
[2.2.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.2.0
[2.2.1]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.2.1
[2.3.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.3.0
[2.4.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.4.0
[2.4.1]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.4.1
[2.4.2]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.4.2
[2.5.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.5.0
[2.6.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v2.6.0
