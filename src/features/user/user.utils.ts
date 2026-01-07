import { User as PrismaUser } from '.prisma/client';
import { UserEntity } from './user.entity';
import { userRoleFromString } from './user.types';
import { assertOk } from '../../types';

export function userFromPrismaUser(user: PrismaUser): UserEntity {
  const userRole = userRoleFromString(user.role);
  assertOk(userRole);
  return { ...user, role: userRole.value };
}
