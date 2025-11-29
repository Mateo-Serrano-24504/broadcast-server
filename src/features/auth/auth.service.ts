import jwt from 'jsonwebtoken';
import { JwtPayload } from './auth.types';
import { JWT_SECRET } from '../../config';

export class AuthService {
  constructor() {}

  generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, JWT_SECRET);
  }
  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  }
}
