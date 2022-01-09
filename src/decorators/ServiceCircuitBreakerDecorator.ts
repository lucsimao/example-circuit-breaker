import { CircuitBreakerClient } from '../interfaces/CircuitBreakerClient';
import { Service } from '../interfaces/Service';
import { ServiceUnavailableError } from '../errors/ServiceUnavailableError';

export class ServiceCircuitBreakerDecorator implements Service {
  constructor(
    private readonly service: Service,
    private readonly circuitBreaker: CircuitBreakerClient<number, string>
  ) {
    this.circuitBreaker.listen(this.service.callApi);
    this.circuitBreaker.fallback(() => {
      throw new ServiceUnavailableError();
    });
  }

  public async callApi(number: number): Promise<string> {
    return await this.circuitBreaker.fire(number);
  }
}
