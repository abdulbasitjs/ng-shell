export interface AuthResponse {
  id: number;
  name: string;
  mail: string;
  role: number;
  permissions: Array<any>;
  access_token: string;
  token_type: string;
}
