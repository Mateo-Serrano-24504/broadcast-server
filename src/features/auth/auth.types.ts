import type { UserRole } from '../user';

export interface TokenSet {
  access: string;
  refresh: string;
}

export interface UserCredentials {
  id: number;
  username: string;
  role: UserRole;
}
