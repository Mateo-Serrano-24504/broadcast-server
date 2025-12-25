import { Request, Response, NextFunction } from 'express';
import { requestContext } from '../../infraestructure';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { UserCredentials } from './auth.types';

// Token decomposition middleware
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  const payload = jwt.verify(token, JWT_SECRET) as UserCredentials;
  requestContext.setUserId(payload.id);
  requestContext.setUserName(payload.username);
  requestContext.setUserRole(payload.role);
  next();
}
