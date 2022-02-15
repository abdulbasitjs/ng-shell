export interface IDropdown {
  label: string,
  value: string,
  active: boolean;
  [key: string]: any;
}

export enum SettingDropdownEnum {
  Profile = 'profile',
  UserManagement = 'user-management',
  Logout = 'logout',
}
