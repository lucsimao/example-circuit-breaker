export class ServiceUnavailableError extends Error {
  constructor() {
    super('Sorry, the service is unavailable, please try again later');
    this.name = 'ServiceUnavailableError';
  }
}
