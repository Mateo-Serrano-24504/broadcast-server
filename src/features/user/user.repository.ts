import { User } from './user.entity';
import { UserData } from './user.types';
import { Repository } from '../../infraestructure';

export interface UserRepository extends Repository<User, UserData, number> {
  verifyById(userId: number): Promise<boolean>;
  findByData(userData: UserData): Promise<null | User>;
}
