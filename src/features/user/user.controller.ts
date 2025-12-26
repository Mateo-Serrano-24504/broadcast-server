import { UserService } from './user.service';
import { LoginDTO, LogoutDTO, RegisterDTO } from './user.types';

export class UserController {
  constructor(private userService: UserService) {}

  async loginUser(loginDTO: LoginDTO) {
    return await this.userService.login(loginDTO);
  }

  async registerUser(registerDTO: RegisterDTO) {
    return await this.userService.register(registerDTO);
  }

  async logoutUser(logoutDTO: LogoutDTO) {
    return await this.userService.logout(logoutDTO);
  }
}
