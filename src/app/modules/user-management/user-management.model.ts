import { IModulesRolesResponse } from './models/modules-response.model';

export interface IGetUsersPayload {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}

export interface IUserPermission {
  [key: string]: IModulesRolesResponse;
}

export interface IUserItem {
  createdAt: string;
  email: string;
  id: number;
  name: string;
  permission: IUserPermission;
  status: number;
  username?: string;
}

export interface IUsersResponse {
  from: number;
  items: Array<IUserItem>;
  to: number;
}
export interface UserProfile {
  email: string;
  name: string;
  permission: { [key: string]: IModulesRolesResponse };
}
