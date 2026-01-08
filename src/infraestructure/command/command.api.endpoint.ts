import { Request, Response } from 'express';
import { CommandExpress } from './command.express';
import { ApiResponseType, ExecuteOutput } from './types';
import type { ExpressInputAdapter, OutputAdapter } from '../adapter';
import { Err, Ok, Result } from '../../types';
import {
  ApiError,
  InvalidRequestFormatError,
  InternalServerError,
} from './command.api.errors';

/**
 * @description A generic command for API endpoints. It uses
 * an express input adapter to extract the data from the Express
 * request to a local format.
 * @template ExecIn The type of the data used to execute the command
 * @template ExecInErr The type of the error returned by the input adapter
 * @template ExecOut The type of the command's return value
 * @template ExecOutErr The type of the error returned by the command
 * @returns When either the request format is invalid or the command
 * fails its execution, an ApiError is returned. If none of these happen,
 * the command's return value is returned.
 * */
export abstract class CommandApiEndpoint<
  ExecIn,
  ExecInErr extends Error,
  ExecOut,
  ExecOutErr extends Error,
> extends CommandExpress<Result<ApiResponseType, ApiError>> {
  protected constructor(
    request: Request,
    response: Response,
    protected readonly expressInputAdapter: ExpressInputAdapter<
      Result<ExecIn, ExecInErr>
    >,
    protected readonly outputAdapter: OutputAdapter<
      Result<ExecOut, ExecOutErr>,
      ApiResponseType
    >
  ) {
    super(request, response, null);
  }

  async execute() {
    const adapterResult = await this.expressInputAdapter.toLocalFormat(
      super.request
    );
    if (!adapterResult.ok) {
      return Err(new InvalidRequestFormatError());
    }
    try {
      const localData = adapterResult.value;
      const result = await this.executeFromLocalFormat(localData);
      const outputData = await this.outputAdapter.toExternalFormat(result.data);
      return Ok(outputData);
    } catch {
      return Err(new InternalServerError());
    }
  }

  /**
   * @description Executes the command using the local data format.
   * @return The result of the command execution. It might be either
   * a success or a failure, in both cases an exit code must be
   * provided. Whether the return is a success or an error,
   * it is sent to the client as a JSON response.
   * */
  abstract executeFromLocalFormat(
    data: ExecIn
  ): Promise<ExecuteOutput<ExecOut, ExecOutErr>>;
}
