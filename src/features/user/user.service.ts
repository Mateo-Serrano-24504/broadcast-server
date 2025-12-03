import {
  User,
  UserRepository,
  UserData,
  UserRemoveError,
  UserLoginError,
  UserRegisterError,
} from '../user';
import { AuthService, TokenSet } from '../auth';
import { Result, Error, Ok } from '../../types';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async removeUser(userId: number): Promise<Result<User, UserRemoveError>> {
    return this.userRepository.remove(userId);
  }
  async loginUser(
    userData: UserData
  ): Promise<Result<TokenSet, UserLoginError>> {
    const user = await this.userRepository.findUserByData(userData);
    if (user) {
      return Ok(this.authService.generateTokens(user));
    } else {
      return Error(new UserLoginError());
    }
  }
  async registerUser(
    userData: UserData
  ): Promise<Result<User, UserRegisterError>> {
    const result = await this.userRepository.save(userData);
    if (result.ok) {
      return Ok(result.value);
    } else {
      return Error(new UserRegisterError());
    }
  }
}
