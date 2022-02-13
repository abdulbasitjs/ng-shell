export interface IDropdown {
  label: string,
  value: string,
  active: boolean
}

export enum SettingDropdownEnum {
  Profile = 'profile',
  UserManagement = 'user-management',
  Logout = 'logout',
}
