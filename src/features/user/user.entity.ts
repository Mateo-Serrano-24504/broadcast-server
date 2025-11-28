import type { UserRole } from './user.types';

export class User {
  constructor(
    private _username: string,
    private _password: string,
    private _role: UserRole
  ) {}
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
  get role() {
    return this._role;
  }
}
