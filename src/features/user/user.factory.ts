import { UserEntity, UserData } from '../user';

export class UserFactory {
  static async create(id: number, userData: UserData): Promise<UserEntity> {
    return {
      id,
      username: userData.username,
      role: userData.role,
      password: userData.password,
    };
  }
}
