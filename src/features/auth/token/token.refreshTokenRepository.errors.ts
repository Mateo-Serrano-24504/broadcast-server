import {
  RepositorySaveError,
  RepositoryRemoveError,
} from '../../../infraestructure';

export class TokenSaveError extends RepositorySaveError {
  constructor() {
    super('Error in saving token');
  }
}

export class TokenRemoveError extends RepositoryRemoveError {
  constructor() {
    super('Error in removing token');
  }
}
