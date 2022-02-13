import { endpoints } from '@configs/index';

export const environment = {
  production: true,
  LOG_LEVEL: 'ERROR',
  sso: {
    baseUrl: 'http://18.119.133.175/',
  },
  local: {
    baseUrl: 'http://localhost:3000/',
  },
  endpoints: [...endpoints],
};
