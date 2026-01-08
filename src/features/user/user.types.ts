export const UserRoles = {
  User: 'user',
  Admin: 'admin',
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];

export interface UserData {
  username: string;
  password: string;
  role: UserRole;
}

export interface LoginDTO {
  username: string;
  password: string;
}

export interface RegisterDTO {
  password: string;
  username: string;
}

export interface LogoutDTO {
  accessToken: string;
  refreshToken: string;
}
