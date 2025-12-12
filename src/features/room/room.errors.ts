export class RoomCreateError extends Error {
  constructor() {
    super('Error in creation of room');
    this.name = 'RoomCreateError';
  }
}
