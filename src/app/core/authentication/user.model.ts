import { IModulesRolesResponse } from 'src/app/modules/user-management/models/modules-response.model';

export interface User {
  permissions: { [key: string]: IModulesRolesResponse };
  token: string;
  refreshToken: string;
}
