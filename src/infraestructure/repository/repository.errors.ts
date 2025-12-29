import { SelfNamedError } from '../../utils';

export interface RepositoryError {
  readonly repositoryErrorType: string;
}

export class RepositorySaveError
  extends SelfNamedError
  implements RepositoryError
{
  readonly repositoryErrorType = 'SaveError';
  constructor(message?: string) {
    super(message ?? 'Error in saving entity');
  }
}

export class RepositoryRemoveError
  extends SelfNamedError
  implements RepositoryError
{
  readonly repositoryErrorType = 'RemoveError';
  constructor(message?: string) {
    super(message ?? 'Error in removing entity');
  }
}
