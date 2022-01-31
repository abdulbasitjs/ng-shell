export interface User {
  id: number;
  name: string;
  email: string;
  roles: number;
  permissions: Array<any>;
  token: string;
}
