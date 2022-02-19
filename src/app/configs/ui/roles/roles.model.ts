export enum RTPDDashboardRolesEnum {
  SuperAdmin = 1,
  Admin = 2,
}

export enum RTPDProvisioningRolesEnum {
  SuperAdmin = 1,
  Admin = 2,
  Manager = 3,
}

export enum OTIProvisioningRolesEnum {
  SuperAdmin = 1,
  Admin = 2,
  SalesOperation = 3,
  Sales = 4,
  User = 5,
}

export enum OTIDashboardRolesEnum {
  SuperAdmin = 1,
  Admin = 2,
}

export enum AllRolesEnum {
  SuperAdmin = 'superadmin',
  Admin = 'admin',
  SalesOperation = 'sales-op',
  Sales = 'sales',
  Manager = 'manager',
  User = 'user',
}

export enum AllRolesReverseEnum {
  superadmin = 'SuperAdmin',
  admin = 'Admin',
  'sales-op' = 'SalesOperation',
  sales = 'Sales',
  manager = 'Manager',
  user = 'User',
}
export interface IModuleControl {
  module_name: string;
  action: string;
  create?: boolean;
  update?: boolean;
  delelte?: boolean;
  read?: boolean;
}
export interface IPermissionAccessControl {
  exclude_controls: IModuleControl[];
}
export interface ISSORoles {
  SuperAdmin: string | IPermissionAccessControl;
  Admin: string | IPermissionAccessControl;
}
export interface IOtiProvisioningRoles extends ISSORoles {
  SalesOperation: string | IPermissionAccessControl;
  Sales: string | IPermissionAccessControl;
  User: string | IPermissionAccessControl;
}

export interface IOtiDashboardRoles extends ISSORoles {}
export interface IRTPDProvisioningRoles extends ISSORoles {
  Manager: string | IPermissionAccessControl;
}

export interface IRTPDDashboardRoles extends ISSORoles {}
export interface IAccessControls {
  [key: string]:
    | IOtiProvisioningRoles
    | IOtiDashboardRoles
    | IRTPDProvisioningRoles
    | IRTPDDashboardRoles;
}
export interface SSORoles {
  [key: string]: string;
}
