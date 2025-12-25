import { UserCredentials } from './auth.types';
import { TokenService, TokenSet } from './token';
import { User } from '../user';

export class AuthService {
  constructor(
    private accessTokenService: TokenService<UserCredentials, string>,
    private refreshTokenService: TokenService<UserCredentials, string>
  ) {}

  private getUserCredentials(user: User): UserCredentials {
    return { id: user.id, username: user.username, role: user.role };
  }
  private async generateAccessToken(
    credentials: UserCredentials
  ): Promise<string> {
    return this.accessTokenService.generateToken(credentials);
  }
  private async generateRefreshToken(
    credentials: UserCredentials
  ): Promise<string> {
    return this.refreshTokenService.generateToken(credentials);
  }
  async generateTokens(user: User): Promise<TokenSet> {
    const credentials = this.getUserCredentials(user);
    return {
      access: await this.generateAccessToken(credentials),
      refresh: await this.generateRefreshToken(credentials),
    };
  }
}
