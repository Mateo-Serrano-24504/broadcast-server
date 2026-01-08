import { UserCredentials } from '../auth.types';

export interface RefreshTokenData {
  token: string;
  userCredentials: UserCredentials;
}

export interface TokenSet {
  access: string;
  refresh: string;
}
