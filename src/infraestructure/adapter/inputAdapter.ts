export interface InputAdapter<T, U> {
  /**
   * @description Converts external data to local data
   * @example If the external data is in HTTP format,
   * this method should convert it to a DTO
   * */
  toLocalFormat(externalData: T): Promise<U>;
}
