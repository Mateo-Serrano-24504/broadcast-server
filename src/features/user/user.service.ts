import { User, UserRepository, UserData } from '../user';
import { AuthService, InvalidCredentialsError, JwtPayload } from '../auth';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async createUser(userData: UserData): Promise<number> {
    return this.userRepository.save(userData);
  }
  async removeUser(userId: number): Promise<void | User> {
    return this.userRepository.remove(userId);
  }
  async loginUser(jwtPayload: JwtPayload): Promise<string> {
    if (await this.userRepository.verifyUserById(jwtPayload.id)) {
      return this.authService.generateAccessToken(jwtPayload);
    } else {
      throw new InvalidCredentialsError();
    }
  }
}
