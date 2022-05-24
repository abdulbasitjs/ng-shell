import { EndpointConfig } from './endpoint.model';
import { AuthEndpoints, AuthEndpointsMapping } from './auth.endpoints';

export const endpoints: EndpointConfig[] = [
  // SSO Apis
  ...AuthEndpoints,
];

export const EP = {
  ...AuthEndpointsMapping,
};
