import crypto from 'crypto';
import { RefreshTokenRepository } from './token.refreshTokenRepository';
import { UserCredentials } from '../auth.types';
import { assertOk } from '../../../types';
import { assertHasValue } from '../../../utils/functions';
import { RefreshTokenService } from './token.refreshToken.Service';

export class CryptoTokenService implements RefreshTokenService<
  UserCredentials,
  string
> {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async generateToken(source: UserCredentials): Promise<string> {
    const refreshTokenData = {
      token: '',
      userCredentials: {
        role: source.role,
        username: source.username,
        id: source.id,
      },
    };
    do {
      refreshTokenData.token = crypto.randomBytes(64).toString('hex');
    } while (
      await this.refreshTokenRepository.findByToken(refreshTokenData.token)
    );
    assertOk(await this.refreshTokenRepository.save(refreshTokenData));
    return refreshTokenData.token;
  }

  async validateToken(token: string): Promise<UserCredentials> {
    const refresh = await this.refreshTokenRepository.findByToken(token);
    assertHasValue(refresh);
    return refresh.userCredentials;
  }

  async invalidateToken(token: string): Promise<void> {
    return this.refreshTokenRepository.removeByToken(token);
  }
}
