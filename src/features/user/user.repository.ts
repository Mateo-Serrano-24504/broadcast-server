import { User, UserData, UserCreateError, UserRemoveError } from '../user';
import { Result, Ok, Error } from '../../types';

import { prisma, userFromPrismaUser } from '../../db';

export interface UserRepository {
  /// Returns the user added to the repository
  save(userData: UserData): Promise<Result<User, UserCreateError>>;

  /// Returns the user itself if found
  remove(userId: number): Promise<Result<User, UserRemoveError>>;

  verifyUserById(userId: number): Promise<boolean>;
  findUserById(userId: number): Promise<null | User>;
  findUserByData(userData: UserData): Promise<null | User>;
}

export class PrismaUserRepository implements UserRepository {
  async findUserByData(userData: UserData): Promise<null | User> {
    const user = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });
    return user ? userFromPrismaUser(user) : null;
  }

  async findUserById(userId: number): Promise<null | User> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user ? userFromPrismaUser(user) : null;
  }

  async remove(userId: number): Promise<Result<User, UserRemoveError>> {
    try {
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return Ok(userFromPrismaUser(user));
    } catch (error) {
      return Error(new UserRemoveError());
    }
  }

  async save(userData: UserData): Promise<Result<User, UserCreateError>> {
    try {
      const user = await prisma.user.create({
        data: userData,
      });
      return Ok(userFromPrismaUser(user));
    } catch (error) {
      return Error(new UserCreateError());
    }
  }

  async verifyUserById(userId: number): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return !!user;
  }
}
