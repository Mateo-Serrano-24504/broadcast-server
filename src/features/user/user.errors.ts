import {
  RepositorySaveError,
  RepositoryRemoveError,
} from '../../infraestructure';
import { SelfNamedError } from '../../utils';

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

export class UserInvalidRoleError extends SelfNamedError {
  constructor() {
    super('Invalid role');
  }
}

export class UserLoginError extends SelfNamedError {
  constructor() {
    super('Error in user login');
  }
}

export class UserRegisterError extends SelfNamedError {
  constructor() {
    super('Error in user registration');
  }
}
