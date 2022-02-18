import { EndpointConfig } from './endpoint.model';
export * from './endpoint.model';

export const endpoints: EndpointConfig[] = [
  // SSO Apis
  {
    baseUrl: 'sso',
    name: 'login',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'resetpassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'forgotpassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'tokenrefresh',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'listing',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'create',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'modules',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'view',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'update',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
];

export const EP = {
  // Authentication Base Apis
  Login: 'login',
  Customers: 'customers',
  Roles: 'roles',
  Packages: 'packages',
  Reset: 'resetpassword',
  Forgot: 'forgotpassword',
  RefreshToken: 'tokenrefresh',

  // User
  UserListing: 'listing',
  UserModules: 'modules',
  CreateUser: 'create',
  UserDetail: 'view',
  UpdateUser: 'update',
};
