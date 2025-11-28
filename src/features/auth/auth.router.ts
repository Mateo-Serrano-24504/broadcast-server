import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/register', () => {
  console.log('USER REGISTER');
});

authRouter.post('/login', () => {
  console.log('USER LOGIN');
});

authRouter.post('/logout', () => {
  console.log('USER LOGOT');
});
