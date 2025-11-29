import type { UserRole } from '../user';

export interface JwtPayload {
  id: number;
  username: string;
  role: UserRole;
}
