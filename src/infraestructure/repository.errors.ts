export abstract class RepositoryError extends Error {
  abstract readonly errorType: string;
  protected constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
  getErrorType() {
    return this.errorType;
  }
}

export class RepositorySaveError extends RepositoryError {
  errorType = 'SaveError';
  constructor(message?: string) {
    super(message ?? 'Error in saving entity');
  }
}

export class RepositoryRemoveError extends RepositoryError {
  errorType = 'RemoveError';
  constructor(message?: string) {
    super(message ?? 'Error in removing entity');
  }
}
