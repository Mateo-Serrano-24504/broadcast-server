import { TokenService } from './token.service';

export interface RefreshTokenService<T, U> extends TokenService<T, U> {
  invalidateToken(token: U): Promise<void>;
}
