import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from './user.service';
import { UserLoginError, UserRegisterError } from './user.errors';
import { assertErr, Err, Ok } from '../../types/result';
import { RepositorySaveError } from '../../infraestructure';

describe('UserService', () => {
  let repo: {
    findByUsernameAndPassword: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
  };
  let auth: {
    generateTokens: ReturnType<typeof vi.fn>;
  };
  let hasher: {
    hash: ReturnType<typeof vi.fn>;
  };
  let service: UserService;

  beforeEach(() => {
    repo = {
      findByUsernameAndPassword: vi.fn(),
      save: vi.fn(),
    };
    auth = {
      generateTokens: vi.fn(),
    };
    hasher = {
      hash: vi.fn(),
    };
    service = new UserService(repo as never, auth as never, hasher as never);
  });

  it('returns tokens when credentials are valid in login', async () => {
    const user = {
      id: 1,
      role: 'user',
      username: 'user',
      password: '1234',
    };

    repo.findByUsernameAndPassword.mockResolvedValue(user);
    auth.generateTokens.mockReturnValue({
      accessToken: 'access',
      refreshToken: 'refresh',
    });
    hasher.hash.mockResolvedValue('hash');

    const result = await service.login({
      username: 'user',
      password: '1234',
    });

    expect(result).toEqual({
      ok: true,
      value: {
        accessToken: 'access',
        refreshToken: 'refresh',
      },
    });

    expect(repo.findByUsernameAndPassword).toHaveBeenCalledWith('user', 'hash');
    expect(auth.generateTokens).toHaveBeenCalledWith(user);
  });

  it('returns error when credentials are invalid in login', async () => {
    repo.findByUsernameAndPassword.mockResolvedValue(null);
    hasher.hash.mockResolvedValue('hash');

    const result = await service.login({
      username: 'user',
      password: '1234',
    });

    expect(result.ok).toBe(false);

    // Just to grant 'result' has an error field
    assertErr(result);
    expect(result.error).toBeInstanceOf(UserLoginError);

    expect(repo.findByUsernameAndPassword).toHaveBeenCalledWith('user', 'hash');
  });

  it('returns tokens when credentials are valid in register', async () => {
    const user = {
      id: 1,
      role: 'user',
      username: 'user',
      password: '1234',
    };

    repo.save.mockResolvedValue(Ok(user));
    auth.generateTokens.mockReturnValue({
      accessToken: 'access',
      refreshToken: 'refresh',
    });
    hasher.hash.mockResolvedValue('hash');

    const result = await service.register({
      username: 'user',
      password: '1234',
    });

    expect(result).toEqual({
      ok: true,
      value: {
        accessToken: 'access',
        refreshToken: 'refresh',
      },
    });

    expect(repo.save).toHaveBeenCalledWith({
      username: 'user',
      password: 'hash',
      role: 'user',
    });
    expect(auth.generateTokens).toHaveBeenCalledWith(user);
  });

  it('returns error when credentials are invalid in register', async () => {
    repo.save.mockResolvedValue(Err(new RepositorySaveError()));
    hasher.hash.mockResolvedValue('hash');

    const result = await service.register({
      username: 'user',
      password: '1234',
    });

    expect(result.ok).toBe(false);
    assertErr(result);
    expect(result.error).toBeInstanceOf(UserRegisterError);

    expect(repo.save).toHaveBeenCalledWith({
      username: 'user',
      password: 'hash',
      role: 'user',
    });
  });
});
