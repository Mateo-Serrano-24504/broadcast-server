import type { UserRole } from './user.types';
import { Entity } from '../../infraestructure';

export class User implements Entity<number> {
  constructor(
    private _id: number,
    private _role: UserRole,
    private _username: string,
    private _password: string
  ) {}
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
