import { User as PrismaUser } from '.prisma/client';
import { assertOk, Err, Ok } from '../../types';
import { UserInvalidRoleError } from './user.errors';
import { UserRole } from './user.types';

export function userRoleFromString(role: string) {
  try {
    return Ok(role as UserRole);
  } catch {
    return Err(new UserInvalidRoleError());
  }
}

export function userFromPrismaUser(user: PrismaUser) {
  const userRole = userRoleFromString(user.role);
  assertOk(userRole);
  return { ...user, role: userRole.value };
}
