export interface Service {
  callApi(number: number): Promise<string>;
}
