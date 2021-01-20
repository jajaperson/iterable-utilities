export interface Predicate<T> {
  (value: T): boolean;
}

export function kComb<T>(value: T): () => T {
  return () => value;
}
