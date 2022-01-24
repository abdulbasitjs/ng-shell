export interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  permissions: Array<any>;
  token: string;
}
