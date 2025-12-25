import { User } from '../features/user';
import { User as PrismaUser } from '@prisma/client';
import { userRoleFromString } from '../features/user/user.types';
import { assertOk } from '../types';

export function userFromPrismaUser(user: PrismaUser): User {
  const userRole = userRoleFromString(user.role);
  assertOk(userRole);
  return new User(user.id, userRole.value, user.username, user.password);
}
