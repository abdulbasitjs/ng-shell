export const AuthEndpoints = [
  {
    baseUrl: 'sso',
    name: 'login',
    alias: 'login',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'resetpassword',
    alias: 'resetPassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'forgotpassword',
    alias: 'forgotPassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'tokenrefresh',
    alias: 'refreshToken',
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
  Reset: 'resetPassword',
  Forgot: 'forgotPassword',
  RefreshToken: 'refreshToken',
};
