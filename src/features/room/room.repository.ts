import { Room, RoomData, RoomCreateError } from '../room';
import { Result } from '../../types';
import { User } from '../user';

export interface RoomRepository {
  save(roomData: RoomData): Promise<Result<Room, RoomCreateError>>;
  remove(roomId: number): void;

  findRoomById(roomId: number): Promise<null | Room>;
  finRoomsByName(roomName: string): Promise<null | Room[]>;

  addUserToRoom(roomId: number, user: User): Promise<boolean>;
  removeUserFromRoom(roomId: number, userId: number): Promise<void | User>;
}
