import { Err, Ok, Result } from '../../types';
import { UserInvalidRoleError } from './user.errors';

export const UserRole = {
  User: 'user',
  Admin: 'admin',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export function userRoleFromString(
  role: string
): Result<UserRole, UserInvalidRoleError> {
  try {
    return Ok(role as UserRole);
  } catch {
    return Err(new UserInvalidRoleError());
  }
}

export interface UserData {
  username: string;
  password: string;
  role: UserRole;
}
