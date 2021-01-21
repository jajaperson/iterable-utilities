/**
 * Creates a function which always returns the same value.
 * @param value The value to be returned
 * @internal
 */
export function kComb<T>(value: T): () => T {
  return () => value;
}
