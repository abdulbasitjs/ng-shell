export const OTIPPEndpoints = [
  {
    baseUrl: 'sso',
    name: 'customers',
    alias: 'customers',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'generatekey',
    alias: 'generatekey',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'create',
    alias: 'createCompany',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'update',
    alias: 'updateCompany',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'enabledisable',
    alias: 'changeStatus',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'view',
    alias: 'customerDetail',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'delete',
    alias: 'deleteCompany',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'stats',
    alias: 'companyStats',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'statsdownload',
    alias: 'downloadStats',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/customers/',
    runAt: 'onDemand',
  },


  {
    baseUrl: 'sso',
    name: 'packages',
    alias: 'packages',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'create',
    alias: 'createPackage',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/packages/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'view',
    alias: 'packageDetail',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/packages/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'update',
    alias: 'updatePackage',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/packages/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'delete',
    alias: 'deletePackage',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/packages/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'enabledisable',
    alias: 'changePackageStatus',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/oti/packages/',
    runAt: 'onDemand',
  },
];

export const OTIPPEndpointMapping = {
  Customers: 'customers',
  GenerateKey: 'generatekey',
  CreateCustomer: 'createCompany',
  UpdateCopmany: 'updateCompany',
  CustomerDetail: 'customerDetail',
  CustomerChangeStatus: 'changeStatus',
  DeleteCompany: 'deleteCompany',
  CompanyStats: 'companyStats',
  DownloadStats: 'downloadStats',

  Packages: 'packages',
  CreatePackage: 'createPackage',
  PackageDetail: 'packageDetail',
  UpdatePackage: 'updatePackage',
  DeletePackage: 'deletePackage',
  ChangePackageStatus: 'changePackageStatus'
};
