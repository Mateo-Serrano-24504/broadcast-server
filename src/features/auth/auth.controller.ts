import { Request, Response } from 'express';
import { AuthService } from '../auth';
import { UserService } from '../user';

export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  async loginUser(req: Request, res: Response) {
    const credentials = {
      username: req.body.username,
      password: req.body.password,
    };
    if (!credentials.username || !credentials.password) {
      res.status(400).json({ error: 'Missing username or password' });
      return;
    }
    const result = await this.userService.loginUser(credentials);
    if (result.ok) {
      res.status(200).json(result.value);
      return;
    }
    // TODO: Add public errors instead of only using internal errors
    res.status(401).json({ error: result.error });
  }
}
