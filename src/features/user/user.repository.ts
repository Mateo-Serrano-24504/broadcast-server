import { User, UserData } from '../user';

export interface UserRepository {
  /// Returns the user ID
  /// Throws an exception if the user already exists
  save(userData: UserData): Promise<number>;

  /// Returns the user itself if found
  remove(userId: number): Promise<void | User>;

  verifyUserById(userId: number): Promise<boolean>;
  findUserById(userId: number): Promise<void | User>;
}
