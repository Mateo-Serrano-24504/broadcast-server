import { RefreshTokenEntity, RefreshTokenData } from './token.types';
import { PrismaClient } from '@prisma/client';
import { Err, Ok, Result } from '../../../types';
import { refreshTokenFromPrismaRefreshToken } from '../../../db';
import {
  TokenRemoveError,
  TokenSaveError,
} from './token.refreshTokenRepository.errors';
import { RefreshTokenRepository } from './token.refreshTokenRepository';

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: number): Promise<RefreshTokenEntity | null> {
    const token = await this.prisma.refreshToken.findUnique({
      where: { id },
      include: { user: true },
    });
    return token ? refreshTokenFromPrismaRefreshToken(token) : null;
  }

  async removeByToken(token: string): Promise<void> {
    await this.prisma.refreshToken.delete({ where: { token } });
  }

  async remove(
    id: number
  ): Promise<Result<RefreshTokenEntity, TokenRemoveError>> {
    try {
      const token = await this.prisma.refreshToken.delete({
        where: { id },
        include: { user: true },
      });
      return Ok(refreshTokenFromPrismaRefreshToken(token));
    } catch {
      return Err(new TokenRemoveError());
    }
  }

  async save(
    data: RefreshTokenData
  ): Promise<Result<RefreshTokenEntity, TokenSaveError>> {
    try {
      const token = await this.prisma.refreshToken.create({
        data: {
          token: data.token,
          userId: data.userCredentials.id,
        },
        include: { user: true },
      });
      return Ok(refreshTokenFromPrismaRefreshToken(token));
    } catch {
      return Err(new TokenSaveError());
    }
  }

  async findByToken(token: string): Promise<null | RefreshTokenEntity> {
    const refreshToken = await this.prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });
    return refreshToken
      ? refreshTokenFromPrismaRefreshToken(refreshToken)
      : null;
  }
}
