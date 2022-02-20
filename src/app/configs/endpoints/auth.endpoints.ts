export const AuthEndpoints = [
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
];

export const AuthEndpointsMapping = {
  // Authentication Apis
  Login: 'login',
  Customers: 'customers',
  Roles: 'roles',
  Packages: 'packages',
  Reset: 'resetpassword',
  Forgot: 'forgotpassword',
  RefreshToken: 'tokenrefresh',
};
