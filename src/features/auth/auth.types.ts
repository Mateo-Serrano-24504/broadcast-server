import type { UserRole } from '../user';

export interface UserCredentials {
  id: number;
  username: string;
  role: UserRole;
}
