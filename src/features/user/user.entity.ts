import type { UserRole } from './user.types';

export class User {
  constructor(private userRole: UserRole) {}
  get role() {
    return this.userRole;
  }
}
