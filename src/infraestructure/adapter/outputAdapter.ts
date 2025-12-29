export interface OutputAdapter<T, U> {
  /**
   * @description Converts local data to external data
   * @example If the external service requires an HTTP request,
   * this method might take a DTO and convert it to one
   * */
  toExternalFormat(localData: T): Promise<U>;
}
