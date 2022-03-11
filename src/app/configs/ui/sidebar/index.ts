import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';

// Sidebars

export const OtiDashboardSideBarList: Sidebar[] = [
  {
    iconPath: 'assets/svg/navigation-toggle-icon.svg',
    route: '/customers',
  },
  {
    iconPath: 'assets/svg/dashboard-icon.svg',
    route: '/customers',
  },
];

export const UserManagementSideBarList: Sidebar[] = [
  {
    iconPath: 'assets/svg/navigation-toggle-icon.svg',
    route: '/users',
  },
  {
    iconPath: 'assets/svg/customer-management-home-icon.svg',
    route: '/users',
  },
];

export const UserProfileSideBarList: Sidebar[] = [
  {
    iconPath: 'assets/svg/navigation-toggle-icon.svg',
    route: '/profile',
  },
];

export const OtiProvisioningSideBarList: Sidebar[] = [
  {
    iconPath: 'assets/svg/navigation-toggle-icon.svg',
    route: '/customers',
  },
  {
    iconPath: 'assets/svg/customer-management-home-icon.svg',
    route: '/customers',
  },
  {
    iconPath: 'assets/svg/package-management-icon.svg',
    route: '/packages',
  },
];

