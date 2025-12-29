/**
 * @description The type of the data returned by any endpoint
 * of the API. Although it might be interpreted as a JSON,
 * it represents either an object with no behavior (i.e., no
 * methods) or a primitive type.
 * */
export type ApiResponseType =
  | string
  | number
  | boolean
  | null
  | { [key: string]: ApiResponseType }
  | ApiResponseType[];

/**
 * @description The type returned by any command execution
 * */
export interface ExecuteOutput {
  data: ApiResponseType;
  statusCode: number;
}
