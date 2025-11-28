import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserData } from './user.types';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: UserData): Promise<number> {
    return this.userRepository.save(userData);
  }
  async removeUser(userId: number): Promise<void | User> {
    return this.userRepository.remove(userId);
  }
}
