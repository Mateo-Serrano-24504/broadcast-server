import { UserService } from './user.service';
import { LoginDTO, RegisterDTO } from './user.types';
import { assertOk } from '../../types';

export class UserController {
  constructor(private userService: UserService) {}

  async loginUser(loginDTO: LoginDTO) {
    return await this.userService.loginUser(loginDTO);
  }

  async registerUser(registerDTO: RegisterDTO) {
    const registrationResult = await this.userService.registerUser(registerDTO);
    if (registrationResult.ok) {
      const loginResult = await this.userService.loginUser(registerDTO);
      assertOk(loginResult);
    }
    return registrationResult;
  }
}
