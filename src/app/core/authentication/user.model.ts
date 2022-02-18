export interface User {
  permissions: { [key: string]: any };
  token: string;
  refreshToken: string;
}
