import { Request, Response, NextFunction } from 'express';
import { requestContext } from './requestContext';

// Request context initialization middleware
export function requestContextMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const context = {
    userId: undefined,
    userName: undefined,
    userRole: undefined,
  };
  requestContext.run(context, () => next());
}
