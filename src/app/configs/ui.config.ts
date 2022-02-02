export const OTI_PROVISIONING_KEY = 'oti-provisioning';
export const OTI_DASHBOARD_KEY = 'oti-dashboard';
export const RTPD_PROVISIONING_KEY = 'rtpd-provisioning';
export const RTPD_DASHBOARD_KEY = 'rtpd-dashboard';

export const ProjectAccessControls: any = {
  [OTI_PROVISIONING_KEY]: {
    Admin: '*',
    Sales_Operation: {
      access_controls: [
        {
          module_name: 'admin-management',
          action: "disabled",
          create: true,
          update: false,
          delelte: false,
          read: true,
        },
        {
          module_name: 'new-company',
          action: "disabled",
        },
      ],
    },
    Sales: {
      access_controls: [
        {
          module_name: 'admin-management',
          action: "hide", // hide
        },
        {
          module_name: 'new-company',
          action: "hide", // disable event
        },
      ],
    },
    User: '!'
  },
};

export const settingDropdownList = [
  { label: 'User Profile', value: 'profile', active: false },
  { label: 'User Management', value: 'user-management', active: true },
  { label: 'Logout', value: 'logout', active: false },
];

export const quotaInterval = [
  { label: 'Daily', value: 'daily', active: false },
  { label: 'Weekly', value: 'weekly', active: false },
  { label: 'Monthly', value: 'monthly', active: false },
  { label: 'Yearly', value: 'yearly', active: false },
];
