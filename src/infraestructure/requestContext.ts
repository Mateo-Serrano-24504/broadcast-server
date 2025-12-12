import { AsyncLocalStorage } from 'node:async_hooks';
import { UserRole } from '../features/user';
import { Result, Error, Ok } from '../types';
import { RequestContextError } from './requestContext.error';

export interface RequestContext {
  userId?: number;
  userName?: string;
  userRole?: UserRole;
}

class RequestContextStorage {
  private storage = new AsyncLocalStorage<RequestContext>();
  private getRequestContextField<Key extends keyof RequestContext>(
    key: Key
  ): Result<void | RequestContext[Key], RequestContextError> {
    const store = this.storage.getStore();
    if (!store) {
      return Error(new RequestContextError(key));
    }
    return Ok(store[key]);
  }
  run(requestContext: RequestContext, callback: () => void) {
    this.storage.run(requestContext, callback);
  }
  get userId(): Result<void | number, RequestContextError> {
    return this.getRequestContextField('userId');
  }
  get userName(): Result<void | string, RequestContextError> {
    return this.getRequestContextField('userName');
  }
  get userRole(): Result<void | UserRole, RequestContextError> {
    return this.getRequestContextField('userRole');
  }
}

export const requestContext = new RequestContextStorage();
