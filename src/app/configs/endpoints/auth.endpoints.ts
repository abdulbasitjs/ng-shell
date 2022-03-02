export const AuthEndpoints = [
  {
    baseUrl: 'sso',
    name: 'login',
    alias: 'login',
    path: 'auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'resetpassword',
    alias: 'resetPassword',
    path: 'auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'forgotpassword',
    alias: 'forgotPassword',
    path: 'auth/',
    noToken: true,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'tokenrefresh',
    alias: 'refreshToken',
    path: 'auth/',
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
