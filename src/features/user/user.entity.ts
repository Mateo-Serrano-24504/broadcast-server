import type { UserRole } from './user.types';
import { Entity } from '../../infraestructure';

export interface UserEntity extends Entity<number> {
  id: number;
  role: UserRole;
  username: string;
  password: string;
}
