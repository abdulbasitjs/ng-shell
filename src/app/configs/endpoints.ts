import { EndpointConfig } from '@shared/models/endpoint-config.model';

export const endpoints: EndpointConfig[] = [
  // SSO Apis
  {
    baseUrl: 'sso',
    name: 'login',
    api: '',
    path: 'abubakar/one-portal-api/public/api/v1/auth/',
    isPollable: false,
    runAt: 'onDemand',
  },
  {
    baseUrl: 'local',
    name: 'customers',
    api: '',
    path: '',
    isPollable: false,
    runAt: 'onDemand',
  },
];

export const EP = {
  Login: 'login',
  Customers: 'customers',
};
