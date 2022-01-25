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
  { label: 'User Management', value: 'user-management', active: false },
  { label: 'Logout', value: 'logout', active: false },
];
