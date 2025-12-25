import {
  RepositorySaveError,
  RepositoryRemoveError,
} from '../../infraestructure';

export class UserSaveError extends RepositorySaveError {
  constructor() {
    super('Error in creation of user');
  }
}

export class UserRemoveError extends RepositoryRemoveError {
  constructor() {
    super('Error when removing a user');
  }
}

export class UserLoginError extends Error {
  constructor() {
    super('Error in user login');
    this.name = 'UserLoginError';
  }
}

export class UserRegisterError extends Error {
  constructor() {
    super('Error in user registration');
    this.name = 'UserRegisterError';
  }
}
