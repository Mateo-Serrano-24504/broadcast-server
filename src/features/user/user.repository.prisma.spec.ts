import { describe, it, vi, beforeEach, expect } from 'vitest';
import { PrismaUserRepository } from './user.repository.prisma';
import { UserRoles } from './user.types';

describe('PrismaUserRepository', () => {
  let prismaClient: {
    user: {
      create: ReturnType<typeof vi.fn>;
      findUnique: ReturnType<typeof vi.fn>;
      delete: ReturnType<typeof vi.fn>;
    };
  };
  let repository: PrismaUserRepository;
  beforeEach(() => {
    prismaClient = {
      user: {
        create: vi.fn(),
        findUnique: vi.fn(),
        delete: vi.fn(),
      },
    };
    repository = new PrismaUserRepository(prismaClient as never);
  });
  it('save returns UserEntity when user data is valid', async () => {
    const userData = {
      username: 'user',
      password: 'password',
      role: UserRoles.User,
    };
    prismaClient.user.create.mockResolvedValue({
      id: 1,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.save(userData);
    expect(result).toEqual({
      ok: true,
      value: {
        id: 1,
        username: 'user',
        role: UserRoles.User,
        password: 'password',
      },
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith({ data: userData });
  });
});
