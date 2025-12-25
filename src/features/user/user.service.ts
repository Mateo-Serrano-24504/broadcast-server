import {
  User,
  UserRepository,
  UserData,
  UserRemoveError,
  UserLoginError,
  UserRegisterError,
} from '../user';
import { AuthService, TokenSet } from '../auth';
import { Result, Err, Ok } from '../../types';
import { PasswordHasher } from '../../security';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private passwordHasher: PasswordHasher
  ) {}

  async removeUser(userId: number): Promise<Result<User, UserRemoveError>> {
    return this.userRepository.remove(userId);
  }
  async loginUser(
    userData: UserData
  ): Promise<Result<TokenSet, UserLoginError>> {
    const user = await this.userRepository.findByData(userData);
    if (user) {
      return Ok(this.authService.generateTokens(user));
    } else {
      return Err(new UserLoginError());
    }
  }
  async registerUser(
    userData: UserData
  ): Promise<Result<User, UserRegisterError>> {
    const hashedPassword = await this.passwordHasher.hash(userData.password);
    const result = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
    });
    if (result.ok) {
      return Ok(result.value);
    } else {
      return Err(new UserRegisterError());
    }
  }
}
