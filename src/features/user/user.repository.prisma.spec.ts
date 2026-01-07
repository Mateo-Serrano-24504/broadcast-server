import { describe, it, vi, beforeEach, expect } from 'vitest';
import { PrismaUserRepository } from './user.repository.prisma';
import { UserRoles } from './user.types';
import { assertErr, assertOk } from '../../types/result';
import { UserRemoveError, UserSaveError } from './user.errors';

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
    expect(result.ok).toBe(true);
    assertOk(result);
    expect(result.value).toEqual({
      id: 1,
      username: 'user',
      role: UserRoles.User,
      password: 'password',
    });
    expect(prismaClient.user.create).toHaveBeenCalledWith({ data: userData });
  });
  it('save returns error when user data is invalid', async () => {
    const userData = {
      username: 'user',
      password: 'password',
      role: UserRoles.User,
    };
    prismaClient.user.create.mockRejectedValue(new Error());
    const result = await repository.save(userData);
    expect(result.ok).toBe(false);
    assertErr(result);
    expect(result.error).toBeInstanceOf(UserSaveError);
    expect(prismaClient.user.create).toHaveBeenCalledWith({ data: userData });
  });
  it('findById returns UserEntity when user data is valid', async () => {
    const userId = 1;
    prismaClient.user.findUnique.mockResolvedValue({
      id: userId,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.findById(userId);
    expect(result).toEqual({
      id: userId,
      username: 'user',
      role: UserRoles.User,
      password: 'password',
    });
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('findById returns null when user data is invalid', async () => {
    const userId = 1;
    prismaClient.user.findUnique.mockResolvedValue(null);
    const result = await repository.findById(userId);
    expect(result).toEqual(null);
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('remove returns UserEntity when user data is valid', async () => {
    const userId = 1;
    prismaClient.user.delete.mockResolvedValue({
      id: userId,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.remove(userId);
    expect(result.ok).toBe(true);
    assertOk(result);
    expect(result.value).toEqual({
      id: userId,
      username: 'user',
      role: UserRoles.User,
      password: 'password',
    });
    expect(prismaClient.user.delete).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('remove returns error when user data is invalid', async () => {
    const userId = 1;
    prismaClient.user.delete.mockRejectedValue(new Error());
    const result = await repository.remove(userId);
    expect(result.ok).toBe(false);
    assertErr(result);
    expect(result.error).toBeInstanceOf(UserRemoveError);
    expect(prismaClient.user.delete).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('findByData returns UserEntity when user data is valid', async () => {
    const userData = {
      username: 'user',
      password: 'password',
      role: UserRoles.User,
    };
    prismaClient.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.findByData(userData);
    expect(result).toEqual({
      id: 1,
      username: 'user',
      role: UserRoles.User,
      password: 'password',
    });
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        username: 'user',
      },
    });
  });
  it('findByData returns null when user data is invalid', async () => {
    prismaClient.user.findUnique.mockResolvedValue(null);
    const result = await repository.findByData({
      username: 'user',
      password: 'password',
      role: UserRoles.User,
    });
    expect(result).toEqual(null);
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        username: 'user',
      },
    });
  });
  it('verifyById returns true when user data is valid', async () => {
    const userId = 1;
    prismaClient.user.findUnique.mockResolvedValue({
      id: userId,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.verifyById(userId);
    expect(result).toBe(true);
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('verifyById returns false when user data is invalid', async () => {
    const userId = 1;
    prismaClient.user.findUnique.mockResolvedValue(null);
    const result = await repository.verifyById(userId);
    expect(result).toBe(false);
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: userId,
      },
    });
  });
  it('findByUsernameAndPassword returns UserEntity when user data is valid', async () => {
    prismaClient.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'user',
      role: 'user',
      password: 'password',
    });
    const result = await repository.findByUsernameAndPassword(
      'user',
      'password'
    );
    expect(result).toEqual({
      id: 1,
      username: 'user',
      role: UserRoles.User,
      password: 'password',
    });
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        username: 'user',
        password: 'password',
      },
    });
  });
  it('findByUsernameAndPassword returns null when user data is invalid', async () => {
    prismaClient.user.findUnique.mockResolvedValue(null);
    const result = await repository.findByUsernameAndPassword(
      'user',
      'password'
    );
    expect(result).toEqual(null);
    expect(prismaClient.user.findUnique).toHaveBeenCalledWith({
      where: {
        username: 'user',
        password: 'password',
      },
    });
  });
});
