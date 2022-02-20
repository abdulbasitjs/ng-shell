import { EndpointConfig } from './endpoint.model';
import { AuthEndpoints, AuthEndpointsMapping } from './auth.endpoints';
import { OTIPPEndpointMapping, OTIPPEndpoints } from './oti-provisioning.endpoint';
import { UserManagementEndpoints, UserManagementEndpointsMapping } from './user-management.endpoint';

export const endpoints: EndpointConfig[] = [
  // SSO Apis
  ...AuthEndpoints,
  ...UserManagementEndpoints,
  ...OTIPPEndpoints
];

export const EP = {
  ...AuthEndpointsMapping,
  ...UserManagementEndpointsMapping,
  ...OTIPPEndpointMapping
};
