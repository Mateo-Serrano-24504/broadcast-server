import { RefreshTokenEntity } from './token.types';
import { userRoleFromString } from '../../user';
import {
  RefreshToken as PrismaRefreshToken,
  User as PrismaUser,
} from '@prisma/client';
import { assertOk } from '../../../types';

export function refreshTokenFromPrismaRefreshToken(
  token: PrismaRefreshToken & { user: PrismaUser }
): RefreshTokenEntity {
  const userRole = userRoleFromString(token.user.role);
  assertOk(userRole);
  return {
    id: token.id,
    token: token.token,
    userCredentials: {
      id: token.userId,
      username: token.user.username,
      role: userRole.value,
    },
  };
}
