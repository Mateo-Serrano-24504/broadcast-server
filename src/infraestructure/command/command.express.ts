import { Request, Response, NextFunction } from 'express';
import { Command } from './command';

export abstract class CommandExpress<T> implements Command<T> {
  protected constructor(
    protected readonly request: Request,
    protected readonly response: Response,
    protected readonly next: NextFunction | null
  ) {}
  abstract execute(): Promise<T>;
}
