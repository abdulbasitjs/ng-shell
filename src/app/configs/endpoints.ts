import { environment } from '@environment/environment';
import { EndpointConfig } from '@shared/models/endpoint-config.model';

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
];

export const EP = {
  Login: 'login',
  Customers: 'customers',
  Roles: 'roles',
  Packages: 'packages',
  Reset: 'resetpassword',
  Forgot: 'forgotpassword',
  RefreshToken: 'tokenrefresh',
  UserListing: 'listing'
};
