import { Service } from './interfaces/Service';

const trueNumbers = [0, 1, 2, 5, 9, 10, 11, 12];

export class ThirdApi implements Service {
  public async callApi(number: number): Promise<string> {
    console.log(`${number}s - ${ThirdApi.prototype.callApi.name} was called`);

    if (trueNumbers.includes(number)) {
      return `${number}s - ${ThirdApi.prototype.callApi.name} resolved with success`;
    }
    throw new Error(`${number}s - ${ThirdApi.prototype.callApi.name} rejected`);
  }
}
