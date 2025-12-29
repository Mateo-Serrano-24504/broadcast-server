import { CommandUser } from './command.user';
import { RegisterDTO } from '../user.types';
import { TokenSet } from '../../auth';
import { UserRegisterError } from '../user.errors';

export class CommandRegister extends CommandUser<
  RegisterDTO,
  TokenSet,
  UserRegisterError
> {
  async executeFromLocalFormat(data: RegisterDTO) {
    const result = await super.controller.registerUser(data);
    return {
      ...result,
      data: result.result,
    };
  }
}
