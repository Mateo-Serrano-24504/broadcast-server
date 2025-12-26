import { User } from './user.entity';
import { UserRepository } from './user.repository';
import {
  UserRemoveError,
  UserLoginError,
  UserRegisterError,
} from './user.errors';
import { LoginDTO, LogoutDTO, RegisterDTO, UserRoles } from './user.types';
import { AuthService, TokenSet } from '../auth';
import { PasswordHasher } from '../../security';
import { Result, Err, Ok } from '../../types';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService,
    private passwordHasher: PasswordHasher
  ) {}

  /**
   * @description Logs in a user with the given credentials.
   * @param loginDTO The credentials to log in with
   * @returns The tokens generated for the user
   */
  async login(loginDTO: LoginDTO): Promise<Result<TokenSet, UserLoginError>> {
    loginDTO.password = await this.passwordHasher.hash(loginDTO.password);
    const user = await this.userRepository.findByUsernameAndPassword(
      loginDTO.username,
      loginDTO.password
    );
    if (user) {
      return Ok(await this.authService.generateTokens(user));
    } else {
      return Err(new UserLoginError());
    }
  }

  /**
   * @description Registers and logs in a user with the given credentials.
   * @param registerDTO The credentials to register with
   * @returns The tokens generated for the user
   */
  async register(
    registerDTO: RegisterDTO
  ): Promise<Result<TokenSet, UserRegisterError>> {
    registerDTO.password = await this.passwordHasher.hash(registerDTO.password);
    const result = await this.userRepository.save({
      ...registerDTO,
      role: UserRoles.User,
    });
    if (result.ok) {
      return Ok(await this.authService.generateTokens(result.value));
    } else {
      return Err(new UserRegisterError());
    }
  }

  /**
   * @description Logs out a user with the given tokens.
   * @param logoutDTO The tokens to invalidate
   */
  async logout(logoutDTO: LogoutDTO): Promise<void> {
    const tokenSet = {
      access: logoutDTO.accessToken,
      refresh: logoutDTO.refreshToken,
    };
    return this.authService.invalidateTokens(tokenSet);
  }
}
