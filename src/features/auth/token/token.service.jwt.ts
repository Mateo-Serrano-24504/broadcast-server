import jwt from 'jsonwebtoken';
import { TokenService } from './token.service';

export class JwtTokenService<T extends object> implements TokenService<
  T,
  string
> {
  constructor(protected readonly secret: string) {}
  async generateToken(source: T): Promise<string> {
    return jwt.sign(source, this.secret);
  }
  async validateToken(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T;
  }
}
