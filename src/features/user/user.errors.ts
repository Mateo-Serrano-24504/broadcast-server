export class UserCreateError extends Error {
  constructor() {
    super('Error in creation of user');
    this.name = 'UserCreateError';
  }
}

export class UserRemoveError extends Error {
  constructor() {
    super('Error when removing a user');
    this.name = 'UserRemoveError';
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
