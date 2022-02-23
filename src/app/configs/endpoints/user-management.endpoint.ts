export const UserManagementEndpoints = [
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
  {
    baseUrl: 'sso',
    name: 'delete',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'me',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofilepassword',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
  {
    baseUrl: 'sso',
    name: 'updateprofile',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/users/',
    runAt: 'onDemand',
  },
];

export const UserManagementEndpointsMapping = {
  // User Management
  UserListing: 'listing',
  UserModules: 'modules',
  CreateUser: 'create',
  UserDetail: 'view',
  UpdateUser: 'update',
  DeleteUser: 'delete',

  // User Prfoile
  Me: 'me',
  UpdatePassword: 'updateprofilepassword',
  UpdateProfile: 'updateprofile',
};
