export enum RTPDDashboardRoles {
  Admin = 2,
  User = 1,
}

export enum RTPDProvisioningRoles {
  Admin = 3,
  Sales_Operation = 2,
  User = 1,
}

export enum OTIProvisioningRoles {
  Admin = 4,
  Sales_Operation = 3,
  Sales = 2,
  User = 1,
}

export enum OTIDashboardRoles {
  Admin = 2,
  User = 1,
}

export interface SSORoles {
  [key: string]: string;
}
