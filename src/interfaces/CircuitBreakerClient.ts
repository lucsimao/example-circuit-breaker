export interface CircuitBreakerClient<T, K> {
  fire(...params: T[]): Promise<K>;
  fallback(callback: (...params: T[]) => void): void;
  listen(callback: (...params: T[]) => Promise<K>): void;
}
