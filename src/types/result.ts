export type Result<T, E> = Ok<T> | Err<E>;

export interface Ok<T> {
  ok: true;
  value: T;
}

export interface Err<E> {
  ok: false;
  error: E;
}

export function Ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function Err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export function assertOk<T>(value: Result<T, unknown>): asserts value is Ok<T> {
  if (!value.ok) {
    throw new Error('Expected an Ok result');
  }
}
