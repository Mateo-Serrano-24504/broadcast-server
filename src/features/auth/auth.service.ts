import jwt from 'jsonwebtoken';
import { JwtPayload, TokenSet } from '../auth';
import { JWT_SECRET } from '../../config';
import { User } from '../user';
import crypto from 'crypto';

export class AuthService {
  constructor() {}

  private generateJwtPayload(user: User): JwtPayload {
    return { id: user.id, username: user.username, role: user.role };
  }
  private generateAccessToken(user: User): string {
    return jwt.sign(this.generateJwtPayload(user), JWT_SECRET);
  }
  private generateRefreshToken(): string {
    return crypto.randomBytes(64).toString('hex');
  }
  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
  generateTokens(user: User): TokenSet {
    return {
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(),
    };
  }
}
