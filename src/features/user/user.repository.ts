import { UserEntity } from './user.entity';
import { UserData } from './user.types';
import { Repository } from '../../infraestructure';

export interface UserRepository extends Repository<
  UserEntity,
  UserData,
  number
> {
  verifyById(userId: number): Promise<boolean>;
  findByData(userData: UserData): Promise<null | UserEntity>;

  findByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<UserEntity | null>;
}
