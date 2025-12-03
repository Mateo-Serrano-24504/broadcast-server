export type Result<T, E> = Ok<T> | Error<E>;

export interface Ok<T> {
  ok: true;
  value: T;
}

export interface Error<E> {
  ok: false;
  error: E;
}

export function Ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function Error<E>(error: E): Error<E> {
  return { ok: false, error };
}
