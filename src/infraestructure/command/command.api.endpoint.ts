import { Request, Response } from 'express';
import { CommandExpress } from './command.express';
import { ApiResponseType, ExecuteOutput } from './types';
import type { ExpressInputAdapter, OutputAdapter } from '../adapter';
import { Result } from '../../types';

/**
 * @description A generic command for API endpoints. It uses
 * an express input adapter to extract the data from the Express
 * request to a local format.
 * @template ExecIn The type of the data used to execute the command
 * */
export abstract class CommandApiEndpoint<
  ExecIn,
  T,
  U extends Error,
> extends CommandExpress<void> {
  protected constructor(
    request: Request,
    response: Response,
    protected readonly expressInputAdapter: ExpressInputAdapter<ExecIn>,
    protected readonly outputAdapter: OutputAdapter<
      Result<T, U>,
      ApiResponseType
    >
  ) {
    super(request, response, null);
  }

  async execute() {
    const localData = await this.expressInputAdapter.toLocalFormat(
      super.request
    );
    const result = await this.executeFromLocalFormat(localData);
    const outputData = await this.outputAdapter.toExternalFormat(result.data);
    this.response.status(result.statusCode);
    this.response.json(outputData);
  }

  /**
   * @description Executes the command using the local data format.
   * @return The result of the command execution. It might be either
   * a success or a failure, in both cases an exit code must be
   * provided. Whether the return is a success or an error,
   * it is sent to the client as a JSON response.
   * */
  abstract executeFromLocalFormat(data: ExecIn): Promise<ExecuteOutput<T, U>>;
}
