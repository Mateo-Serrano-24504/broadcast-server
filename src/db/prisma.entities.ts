import { User } from '../features/user';
import {
  RefreshToken as PrismaRefreshToken,
  User as PrismaUser,
} from '@prisma/client';
import { userRoleFromString } from '../features/user/user.types';
import { assertOk } from '../types';
import { RefreshTokenEntity } from '../features/auth/token';

export function userFromPrismaUser(user: PrismaUser): User {
  const userRole = userRoleFromString(user.role);
  assertOk(userRole);
  return new User(user.id, userRole.value, user.username, user.password);
}

export function refreshTokenFromPrismaRefreshToken(
  token: PrismaRefreshToken & { user: PrismaUser }
): RefreshTokenEntity {
  const userRole = userRoleFromString(token.user.role);
  assertOk(userRole);
  return {
    get id(): number {
      return token.id;
    },
    token: token.token,
    userCredentials: {
      id: token.userId,
      username: token.user.username,
      role: userRole.value,
    },
  };
}
