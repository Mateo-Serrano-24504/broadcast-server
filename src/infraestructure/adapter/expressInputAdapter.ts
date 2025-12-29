import { Request } from 'express';
import { InputAdapter } from './inputAdapter';

export type ExpressInputAdapter<T> = InputAdapter<Request, T>;
