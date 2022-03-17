import { IAccessControls } from './roles.model';

export * from './roles.model';
export const OTI_PROVISIONING_KEY = 'oti-provisioning';
export const OTI_DASHBOARD_KEY = 'oti-dashboard';
export const RTPD_PROVISIONING_KEY = 'rtpd-provisioning';
export const RTPD_DASHBOARD_KEY = 'rtpd-dashboard';
export const USER_MANAGEMENT_KEY = 'user-management';
export const USER_PROFILE_KEY = 'user-profile';

export const USER_MANAMGEMENT_EXPECTED_ROLES = ['superadmin', 'admin'];

export const SSORolesMappingOfServer: any = {
  [OTI_DASHBOARD_KEY]: 'oti-db',
  [OTI_PROVISIONING_KEY]: 'oti-pp',
  [RTPD_DASHBOARD_KEY]: 'rtpd-db',
  [RTPD_PROVISIONING_KEY]: 'rtpd-pp',
};

export const SSORolesReverseMappingOfServer: any = {
  'oti-pp': 'OTI Provisioning',
  'oti-db': 'OTI Dashboard',
  'rtpd-pp': 'RTPD Provisioning',
  'rtpd-db': 'RTPD Dashboard',
};

export const ProjectAccessControls: IAccessControls = {
  [OTI_PROVISIONING_KEY]: {
    SuperAdmin: '*',
    Admin: {
      exclude_controls: [
        {
          module_name: 'package-management',
          action: 'hide',
        }
      ],
    },
    SalesOperation: {
      exclude_controls: [
        {
          module_name: 'package-management',
          action: 'hide',
        },
        {
          module_name: 'delete-company',
          action: 'hide',
        },
        {
          module_name: 'send-invitation',
          action: 'hide',
        },
        {
          module_name: 'read-exclude-classifiers',
          action: 'hide',
        },
        {
          module_name: 'create-exclude-classifiers',
          action: 'hide',
        },
      ],
    },
    Sales: '!',
    User: '!',
  },
  [USER_MANAGEMENT_KEY]: {
    SuperAdmin: '*',
    Admin: {
      exclude_controls: [
        {
          module_name: 'deleteUser',
          action: 'hide',
          delelte: false,
        },
      ],
    },
  },
};
