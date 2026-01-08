import { UserService } from './user.service';
import { LoginDTO, LogoutDTO, RegisterDTO } from './user.types';

export class UserController {
  constructor(private userService: UserService) {}

  async loginUser(loginDTO: LoginDTO) {
    const result = await this.userService.login(loginDTO);
    let statusCode = 201;
    if (!result.ok) {
      statusCode = 400;
    }
    return { result, statusCode };
  }

  async registerUser(registerDTO: RegisterDTO) {
    const result = await this.userService.register(registerDTO);
    let statusCode;
    if (result.ok) {
      statusCode = 201;
    } else {
      statusCode = 400;
    }
    return { result, statusCode };
  }

  async logoutUser(logoutDTO: LogoutDTO) {
    return await this.userService.logout(logoutDTO);
  }
}
