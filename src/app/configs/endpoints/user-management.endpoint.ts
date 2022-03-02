export const UserManagementEndpoints = [
  {
    baseUrl: 'sso',
    name: 'listing',
    alias: 'users',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'create',
    alias: 'createUser',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'modules',
    alias: 'usersModules',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'view',
    alias: 'userDetail',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'update',
    alias: 'updateUser',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'delete',
    alias: 'deleteUser',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'me',
    api: '',
    alias: 'me',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofilepassword',
    alias: 'changePassword',
    api: '',
    path: 'users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofile',
    alias: 'updateProfile',
    api: '',
    path: 'users/',
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
