import CircuitBreaker from 'opossum';
import { CircuitBreakerClient } from '../interfaces/CircuitBreakerClient';

const CIRCUIT_BREAKER_TIMEOUT =
  Number(process.env.CIRCUIT_BREAKER_TIMEOUT) || 3000;

const THRESHOLD_PERCENTAGE =
  Number(process.env.CIRCUIT_BREAKER_THRESHOLD_PERCENTAGE) || 60;

const RESET_TIMEOUT = Number(process.env.CIRCUIT_BREAKER_RESET_TIMEOUT) || 4000;

const options = {
  timeout: CIRCUIT_BREAKER_TIMEOUT,
  errorThresholdPercentage: THRESHOLD_PERCENTAGE,
  resetTimeout: RESET_TIMEOUT,
};

export class OpossumAdapter<T, K> implements CircuitBreakerClient<T, K> {
  private breaker!: CircuitBreaker;

  public async fire<T, K>(...params: T[]): Promise<K> {
    return (await this.breaker.fire(...params)) as K;
  }

  fallback<T>(callback: (...params: T[]) => void): void {
    this.breaker.fallback(callback);
  }

  listen<T, K>(callback: (...params: T[]) => Promise<K>): void {
    this.breaker = new CircuitBreaker(callback, options);
  }
}
