import { UserData } from './user.types';
import { User } from './user.entity';

export interface UserRepository {
  /// Returns the user ID
  save(userData: UserData): Promise<number>;

  /// Returns the user itself if found
  remove(userId: number): Promise<void | User>;

  findById(userId: number): Promise<void | User>;
}
