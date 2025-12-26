import { Err, Ok, Result } from '../../types';
import { UserInvalidRoleError } from './user.errors';

export const UserRoles = {
  User: 'user',
  Admin: 'admin',
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

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

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  password: string;
  username: string;
}
