import { TokenRepository } from './token.repository';
import { RefreshTokenData } from './token.types';
import { RefreshTokenEntity } from './token.refresh.entity';

export type RefreshTokenRepository = TokenRepository<
  RefreshTokenEntity,
  RefreshTokenData,
  string
>;
