import { describe, it, expect, vi, beforeEach } from 'vitest';
import { UserService } from './user.service';

describe('UserService', () => {
  let repo: {
    findByUsernameAndPassword: ReturnType<typeof vi.fn>;
  };
  let auth: {
    generateTokens: ReturnType<typeof vi.fn>;
  };
  let hasher: {
    hash: ReturnType<typeof vi.fn>;
    compare: ReturnType<typeof vi.fn>;
  };
  let service: UserService;

  beforeEach(() => {
    repo = {
      findByUsernameAndPassword: vi.fn(),
    };
    auth = {
      generateTokens: vi.fn(),
    };
    hasher = {
      hash: vi.fn(),
      compare: vi.fn(),
    };
    service = new UserService(repo as never, auth as never, hasher as never);
  });

  it('returns tokens when credentials are valid', async () => {
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
    hasher.compare.mockResolvedValue(true);

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
});
