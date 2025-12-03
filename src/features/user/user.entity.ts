import type { UserRole, UserData } from '../user';

export class User {
  constructor(
    private _id: number,
    private _role: UserRole,
    private _username: string,
    private _password: string
  ) {}
  static fromUserData(id: number, role: UserRole, userData: UserData): User {
    return new User(id, role, userData.username, userData.password);
  }
  get id() {
    return this._id;
  }
  get role() {
    return this._role;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._password;
  }
}
