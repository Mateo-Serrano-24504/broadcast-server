import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserController } from './user.controller';
import { Err, Ok } from '../../types';
import { UserLoginError } from './user.errors';

describe('UserController', () => {
  let userService: {
    login: ReturnType<typeof vi.fn>;
    register: ReturnType<typeof vi.fn>;
    logout: ReturnType<typeof vi.fn>;
  };
  let controller: UserController;
  beforeEach(() => {
    userService = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
    };
    controller = new UserController(userService as never);
  });
  describe('login', () => {
    it('login returns tokens and code 201 when credentials are valid', async () => {
      const loginDTO = {
        username: 'username',
        password: 'password',
      };
      const tokenSet = {
        accessToken: 'token',
        refreshToken: 'token',
      };
      const expectedResult = {
        statusCode: 201,
        result: Ok(tokenSet),
      };
      userService.login.mockResolvedValue(Ok(tokenSet));

      const result = await controller.loginUser(loginDTO);

      expect(result).toEqual(expectedResult);
    });
    it('login returns an error and code 400 when credentials are invalid', async () => {
      const loginDTO = {
        username: 'username',
        password: 'password',
      };
      const expectedError = new UserLoginError();
      const expectedResult = {
        statusCode: 400,
        result: Err(expectedError),
      };
      userService.login.mockResolvedValue(Err(expectedError));

      const result = await controller.loginUser(loginDTO);

      expect(result).toEqual(expectedResult);
    });
  });
});
