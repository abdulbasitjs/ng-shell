export * from './roles.model';
export const OTI_PROVISIONING_KEY = 'oti-provisioning';
export const OTI_DASHBOARD_KEY = 'oti-dashboard';
export const RTPD_PROVISIONING_KEY = 'rtpd-provisioning';
export const RTPD_DASHBOARD_KEY = 'rtpd-dashboard';

export const SSORolesMappingOfServer: any = {
  [OTI_DASHBOARD_KEY]: 'oti-db',
  [OTI_PROVISIONING_KEY]: 'oti-pp',
  [RTPD_DASHBOARD_KEY]: 'rtpd-db',
  [RTPD_PROVISIONING_KEY]: 'rtpd-pp',
};

export const ProjectAccessControls: any = {
  [OTI_PROVISIONING_KEY]: {
    Admin: '*',
    Sales_Operation: {
      access_controls: [
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
      access_controls: [
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
};
