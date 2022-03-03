import { endpoints } from '@configs/index';

export const environment = {
  production: true,
  LOG_LEVEL: 'ERROR',
  sso: {
    baseUrl: 'https://staging-sp.slashnext.cloud/',
    path: 'sp-api/api/',
    apiVersion: 'v1/',
  },
  endpoints: [...endpoints],
};
