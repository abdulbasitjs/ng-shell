// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { endpoints } from 'src/app/configs/endpoints';

export const environment = {
  production: false,
  LOG_LEVEL: 'DEBUG',
  sso: {
    baseUrl: 'http://18.119.133.175/',
    path: 'abubakar/one-portal-api/public/api/',
    apiVersion: 'v1/'
  },
  local: {
    baseUrl: 'http://localhost:3000/',
  },
  endpoints: [...endpoints],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
