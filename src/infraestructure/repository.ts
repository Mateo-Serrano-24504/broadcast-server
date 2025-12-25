import { Result } from '../types';
import { RepositoryError } from './repository.errors';
import { Entity } from './types';

/**
 * @description A generic repository interface with minimal required operations
 * @template En The entity type
 * @template T The data type used to create the entity
 * @template Id The type of the entity's id
 * */
export interface Repository<En extends Entity<Id>, T, Id> {
  /**
   * @description Saves a new entity to the repository and assigns it an id
   * @returns On success, returns the saved entity. On failure, returns a
   * RepositoryError, commonly a RepositorySaveError
   * */
  save(data: T): Promise<Result<En, RepositoryError>>;

  /**
   * @returns On success, returns the found entity. On failure, returns null
   * */
  findById(id: Id): Promise<En | null>;

  /**
   * @description Removes the entity with the id provided entity from the
   * repository
   * @returns On success, returns the removed entity. On failure, returns a
   * RepositoryError, commonly a RepositoryRemoveError
   * */
  remove(id: Id): Promise<Result<En, RepositoryError>>;
}
