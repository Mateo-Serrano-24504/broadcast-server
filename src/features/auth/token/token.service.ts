/**
 * @template T The type from which generate a token
 * @template U The type of the token
 * */
export interface TokenService<T, U> {
  generateToken(source: T): Promise<U>;
  validateToken(token: U): Promise<T>;
}
