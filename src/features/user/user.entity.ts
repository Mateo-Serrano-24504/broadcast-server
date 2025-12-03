import type { UserRole, UserData } from '../user';

export class User {
  constructor(
    private _id: number,
    private _username: string,
    private _password: string,
    private _role: UserRole
  ) {}
  static fromUserData(id: number, userData: UserData): User {
    return new User(id, userData.username, userData.password, userData.role);
  }
  get id() {
    return this._id;
  }
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
