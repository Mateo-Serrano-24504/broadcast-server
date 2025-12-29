import { Request, Response } from 'express';
import { UserController } from '../user.controller';
import {
  CommandApiEndpoint,
  type ExpressInputAdapter,
  OutputAdapter,
  ApiResponseType,
} from '../../../infraestructure';
import { Result } from '../../../types';

export abstract class CommandUser<
  ExecIn,
  T,
  U extends Error,
> extends CommandApiEndpoint<ExecIn, T, U> {
  protected constructor(
    request: Request,
    response: Response,
    expressInputAdapter: ExpressInputAdapter<ExecIn>,
    outputAdapter: OutputAdapter<Result<T, U>, ApiResponseType>,
    protected readonly controller: UserController
  ) {
    super(request, response, expressInputAdapter, outputAdapter);
  }
}
