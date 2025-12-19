import { User, UserData } from '../user';

export class UserFactory {
  static async create(id: number, userData: UserData): Promise<User> {
    return new User(id, userData.role, userData.username, userData.password);
  }
}
