import jwt from 'jsonwebtoken';
import { UserCredentials, TokenSet } from './auth.types';
import { JWT_SECRET } from '../../config';
import { User } from '../user';
import crypto from 'crypto';

export class AuthService {
  constructor() {}

  // TODO: Add refresh token persistence and a RefreshTokenRepository
  private generateJwtPayload(user: User): UserCredentials {
    return { id: user.id, username: user.username, role: user.role };
  }
  private generateAccessToken(user: User): string {
    return jwt.sign(this.generateJwtPayload(user), JWT_SECRET);
  }
  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
  generateTokens(user: User): TokenSet {
    return {
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(),
    };
  }
}
