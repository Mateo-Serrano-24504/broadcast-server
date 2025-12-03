import jwt from 'jsonwebtoken';
import { JwtPayload } from '../auth';
import { JWT_SECRET } from '../../config';
import { User } from '../user';

export class AuthService {
  constructor() {}

  private generateJwtPayload(user: User): JwtPayload {
    return { id: user.id, username: user.username, role: user.role };
  }
  generateAccessToken(user: User): string {
    return jwt.sign(this.generateJwtPayload(user), JWT_SECRET);
  }
  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
}
