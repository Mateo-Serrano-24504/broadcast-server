import { Result } from '../types';

export interface Entity<Id> {
  get id(): Id;
}

export interface Repository<En extends Entity<Id>, T, Id> {
  /// On success, saves the data to the repository and assings it an id
  /// On failure, returns a custom Err
  save<Err extends Error>(data: T): Promise<Result<En, Err>>;

  /// Returns either the entity or null if not found
  findById(id: Id): Promise<En | null>;

  /// On success, removes the entity from the repository
  /// On failure, returns a custom Err
  remove<Err extends Error>(id: Id): Promise<Result<En, Err>>;
}
