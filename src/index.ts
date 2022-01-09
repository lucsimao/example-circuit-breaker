import { OpossumAdapter } from './adapters/OpossumAdapter';
import { ServiceCircuitBreakerDecorator } from './decorators/ServiceCircuitBreakerDecorator';
import { ThirdApi } from './ThirdApi';

const main = async () => {
  const service = new ThirdApi();
  const circuitBreakerClient = new OpossumAdapter();
  const serviceDecorator = new ServiceCircuitBreakerDecorator(
    service,
    circuitBreakerClient
  );

  for (let i = 1; i < 15; i++) {
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(true);
        }, 1000)
      );
      const result = await serviceDecorator.callApi(i);
      console.log(`${i}s - Service returned ${result}`);
    } catch (e) {
      console.log(`${i}s - Service failed with ${(e as Error).name}`);
    }
  }
};

(async (): Promise<void> => {
  await main();
})();
