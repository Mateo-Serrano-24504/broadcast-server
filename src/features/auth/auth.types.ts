import type { UserRole } from '../user';

export interface JwtPayload {
  id: number;
  username: string;
  role: UserRole;
}

export interface TokenSet {
  access: string;
  refresh: string;
}
