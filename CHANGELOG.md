# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[unreleased]: https://github.com/jajaperson/iterable-utilities/compare/v1.1.0...HEAD
[0.1.1]: https://github.com/jajaperson/iterable-utilities/releases/tag/v0.1.1
[0.1.0]: https://github.com/jajaperson/iterable-utilities/releases/tag/v0.1.0