import { SelfNamedError } from '../../utils';

export class ApiError extends SelfNamedError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidRequestFormatError extends ApiError {
  constructor() {
    super('Invalid request format');
  }
}

export class InternalServerError extends ApiError {
  constructor() {
    super('Internal server error');
  }
}
