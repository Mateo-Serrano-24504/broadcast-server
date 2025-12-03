import {
  User,
  UserRepository,
  UserData,
  UserCreateError,
  UserRemoveError,
  UserLoginError,
} from '../user';
import { AuthService } from '../auth';
import { Result, Error, Ok } from '../../types';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async createUser(userData: UserData): Promise<Result<User, UserCreateError>> {
    return this.userRepository.save(userData);
  }
  async removeUser(userId: number): Promise<Result<User, UserRemoveError>> {
    return this.userRepository.remove(userId);
  }
  async loginUser(userData: UserData): Promise<Result<string, UserLoginError>> {
    const user = await this.userRepository.findUserByData(userData);
    if (user) {
      return Ok(this.authService.generateAccessToken(user));
    } else {
      return Error(new UserLoginError());
    }
  }
}
