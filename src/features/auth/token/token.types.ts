import { Entity } from '../../../infraestructure';
import { UserCredentials } from '../auth.types';

export interface RefreshTokenData {
  token: string;
  userCredentials: UserCredentials;
}

export type RefreshTokenEntity = Entity<number> & RefreshTokenData;

export interface TokenSet {
  access: string;
  refresh: string;
}
