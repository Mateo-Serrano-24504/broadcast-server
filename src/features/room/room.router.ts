import { Router, Request } from 'express';

export const roomRouter = Router();

roomRouter.get('/rooms', () => {
  console.log('GET ROOMS');
});

roomRouter.post('/rooms', () => {
  console.log('POST ROOMS');
});

roomRouter.delete('/rooms/:id', (req: Request) => {
  const id = req.params.id;
  console.log(`DELETE ROOMS ${id}`);
});
