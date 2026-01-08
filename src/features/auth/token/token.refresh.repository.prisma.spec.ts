import { describe, it, beforeEach, expect, vi } from 'vitest';
import { PrismaRefreshTokenRepository } from './token.refresh.repository.prisma';
import { UserRoles } from '../../user';
import { refreshTokenFromPrismaRefreshToken } from './token.utils';
import { assertOk } from '../../../types';

describe('PrismaRefreshTokenRepository', () => {
  let prismaClient: {
    refreshToken: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };
  let repository: PrismaRefreshTokenRepository;
  beforeEach(() => {
    prismaClient = {
      refreshToken: {
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
      },
    };
    repository = new PrismaRefreshTokenRepository(prismaClient as never);
  });
  describe('Create records in the repository', () => {
    it('save returns RefreshTokenEntity when refresh token data is valid', async () => {
      const credentials = {
        id: 1,
        username: 'username',
        role: UserRoles.User,
      };
      const refreshTokenData = {
        token: 'token',
        userCredentials: credentials,
      };
      const record = {
        user: {
          ...credentials,
          password: 'password',
        },
        id: 1,
        token: 'token',
        userId: 1,
      };
      prismaClient.refreshToken.create.mockResolvedValue(record);

      const result = await repository.save(refreshTokenData);
      expect(result.ok).toBe(true);
      assertOk(result);
      expect(result.value).toEqual(refreshTokenFromPrismaRefreshToken(record));
    });
  });
});
