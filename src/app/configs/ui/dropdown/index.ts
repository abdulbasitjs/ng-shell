import { IDropdown } from '../dropdown/dropdown.model';
export * from './dropdown.model';

export const QuotaType: any = {
  Daily: 'day',
  Weekly: 'week',
  Monthly: 'month',
  Yearly: 'year',
};

// Dropdowns
export const settingDropdownList: IDropdown[] = [
  { label: 'User Profile', value: 'profile', active: false },
  { label: 'User Management', value: 'user-management', active: false },
  { label: 'Logout', value: 'logout', active: false },
];

export const QuotaInterval: IDropdown[] = [
  { label: 'Daily', value: 'daily', active: false },
  { label: 'Weekly', value: 'weekly', active: false },
  { label: 'Monthly', value: 'monthly', active: false },
  { label: 'Yearly', value: 'yearly', active: false },
];

export const RateLimitOptions: IDropdown[] = [
  { label: 'Select Rate Limit / Min', value: 'default', active: true },
  { label: 'Custom', value: 'custom', active: false },
];
