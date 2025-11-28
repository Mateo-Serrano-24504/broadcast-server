import { Router, Request } from 'express';

export const userRouter = Router();

userRouter.post('/users', () => {
  console.log('POST USERS');
});

userRouter.delete('/users/:id', (req: Request) => {
  const id = req.params.id;
  console.log(`DELETE USERS ${id}`);
});
