import { User } from '../user';
import { RoomData } from '../room';

export class Room {
  constructor(
    private _name: string,
    private _id: number,
    private _users: Array<User>
  ) {}
  static fromRoomData(id: number, roomData: RoomData): Room {
    return new Room(roomData.name, id, []);
  }
  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }
}
