import { TokenRepository } from './token.repository';
import { RefreshTokenData, RefreshTokenEntity } from './token.types';

export type RefreshTokenRepository = TokenRepository<
  RefreshTokenEntity,
  RefreshTokenData,
  string
>;
