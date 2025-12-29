/**
 * @description A generic command interface
 * @template T The type of the command's return value
 * */
export interface Command<T> {
  execute(): Promise<T>;
}
