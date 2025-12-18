import { User } from '../features/user';
import { User as PrismaUser } from '@prisma/client';

export function userFromPrismaUser(user: PrismaUser): User {
  return new User(user.id, user.role, user.username, user.password);
}
