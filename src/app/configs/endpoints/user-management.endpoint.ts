export const UserManagementEndpoints = [
  {
    baseUrl: 'sso',
    name: 'listing',
    alias: 'users',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'create',
    alias: 'createUser',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'modules',
    alias: 'usersModules',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'view',
    alias: 'userDetail',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'update',
    alias: 'updateUser',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'delete',
    alias: 'deleteUser',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'me',
    api: '',
    alias: 'me',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofilepassword',
    alias: 'changePassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofile',
    alias: 'updateProfile',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
];

export const UserManagementEndpointsMapping = {
  // User Management
  UserListing: 'users',
  UserModules: 'usersModules',
  CreateUser: 'createUser',
  UserDetail: 'userDetail',
  UpdateUser: 'updateUser',
  DeleteUser: 'deleteUser',

  // User Prfoile
  Me: 'me',
  UpdatePassword: 'changePassword',
  UpdateProfile: 'updateProfile',
};
