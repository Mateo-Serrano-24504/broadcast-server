import { Entity, Repository } from '../../../infraestructure';

/**
 * @template T Token entity to be stored
 * @template TData Token data enough to create a token from it
 * @template TValue Representative value of the token, often used as a key
 *
 * @description Repository for unique tokens. Tokens must be uniquely
 * identified by a TValue item, often the token itself.
 * */
export interface TokenRepository<
  T extends Entity<number>,
  TData,
  TValue,
> extends Repository<T, TData, number> {
  findByToken(token: TValue): Promise<null | T>;
  removeByToken(token: TValue): Promise<void>;
}
