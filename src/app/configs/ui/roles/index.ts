import { IAccessControls } from './roles.model';

export * from './roles.model';
export const OTI_PROVISIONING_KEY = 'oti-provisioning';
export const OTI_DASHBOARD_KEY = 'oti-dashboard';
export const RTPD_PROVISIONING_KEY = 'rtpd-provisioning';
export const RTPD_DASHBOARD_KEY = 'rtpd-dashboard';
export const USER_MANAGEMENT_KEY = 'user-management';
export const USER_PROFILE_KEY = 'user-profile';

export const SSORolesMappingOfServer: any = {
  [OTI_DASHBOARD_KEY]: 'oti-db',
  [OTI_PROVISIONING_KEY]: 'oti-pp',
  [RTPD_DASHBOARD_KEY]: 'rtpd-db',
  [RTPD_PROVISIONING_KEY]: 'rtpd-pp',
};

export const ProjectAccessControls: IAccessControls = {
  [OTI_PROVISIONING_KEY]: {
    SuperAdmin: '*',
    Admin: '*',
    SalesOperation: {
      exclude_controls: [
        {
          module_name: 'admin-management',
          action: 'disabled',
          create: true,
          update: false,
          delelte: false,
          read: true,
        },
        {
          module_name: 'new-company',
          action: 'disabled',
        },
      ],
    },
    Sales: {
      exclude_controls: [
        {
          module_name: 'admin-management',
          action: 'hide', // hide
        },
        {
          module_name: 'new-company',
          action: 'hide', // disable event
        },
      ],
    },
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
