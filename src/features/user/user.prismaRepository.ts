import { UserData } from './user.types';
import { Err, Ok, Result } from '../../types';
import { User } from './user.entity';
import { UserRemoveError, UserSaveError } from './user.errors';
import { userFromPrismaUser } from '../../db';
import { UserRepository } from './user.repository';
import { PrismaClient } from '@prisma/client';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(userData: UserData): Promise<Result<User, UserSaveError>> {
    try {
      const user = await this.prisma.user.create({
        data: userData,
      });
      return Ok(userFromPrismaUser(user));
    } catch {
      return Err(new UserSaveError());
    }
  }

  async findById(userId: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? userFromPrismaUser(user) : null;
  }

  async remove(userId: number): Promise<Result<User, UserRemoveError>> {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return Ok(userFromPrismaUser(user));
    } catch {
      return Err(new UserRemoveError());
    }
  }

  async findByData(userData: UserData): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });
    return user ? userFromPrismaUser(user) : null;
  }

  async verifyById(userId: number): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return !!user;
  }
}
