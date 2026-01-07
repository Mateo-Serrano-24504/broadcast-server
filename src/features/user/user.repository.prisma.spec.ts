import { describe, it, vi, beforeEach } from 'vitest';
import { PrismaUserRepository } from './user.repository.prisma';

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
  it('save returns an UserEntity when user data is valid', async () => {});
});
