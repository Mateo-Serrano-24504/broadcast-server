import { AsyncLocalStorage } from 'node:async_hooks';
import { UserRole } from '../features/user';
import { Result, Error, Ok } from '../types';
import { RequestContextError } from './requestContext.error';

export interface RequestContext {
  userId?: number;
  userName?: string;
  userRole?: UserRole;
}

export interface RequestContextProvider {
  get userId(): Result<void | number, RequestContextError>;
  get userName(): Result<void | string, RequestContextError>;
  get userRole(): Result<void | UserRole, RequestContextError>;
}

class RequestContextStorage implements RequestContextProvider {
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
  private setRequestContextField<Key extends keyof RequestContext>(
    key: Key,
    value: RequestContext[Key]
  ) {
    const store = this.storage.getStore();
    if (!store) {
      return Error(new RequestContextError(key));
    }
    store[key] = value;
  }
  run(requestContext: RequestContext, callback: () => void) {
    this.storage.run(requestContext, callback);
  }
  get userId(): Result<void | number, RequestContextError> {
    return this.getRequestContextField('userId');
  }
  setUserId(id?: number): Result<void, RequestContextError> {
    return this.setRequestContextField('userId', id);
  }
  get userName(): Result<void | string, RequestContextError> {
    return this.getRequestContextField('userName');
  }
  setUserName(name?: string): Result<void, RequestContextError> {
    return this.setRequestContextField('userName', name);
  }
  get userRole(): Result<void | UserRole, RequestContextError> {
    return this.getRequestContextField('userRole');
  }
  setUserRole(role?: UserRole): Result<void, RequestContextError> {
    return this.setRequestContextField('userRole', role);
  }
}

export const requestContext = new RequestContextStorage();
