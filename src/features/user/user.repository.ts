import { User, UserData, UserCreateError, UserRemoveError } from '../user';
import type { Result } from '../../types';

export interface UserRepository {
  /// Returns the user added to the repository
  save(userData: UserData): Promise<Result<User, UserCreateError>>;

  /// Returns the user itself if found
  remove(userId: number): Promise<Result<User, UserRemoveError>>;

  verifyUserById(userId: number): Promise<boolean>;
  findUserById(userId: number): Promise<void | User>;
  findUserByData(userData: UserData): Promise<void | User>;
}
