export interface IModulesRolesResponse {
  c: number;
  l: string;
  r: string;
}

export interface IModulesResponse {
  name: string;
  text: string;
  roles: IModulesRolesResponse[];
  disabled?: boolean;
  isInvited?: boolean;
  currentUserPermission?: IModulesRolesResponse
}
