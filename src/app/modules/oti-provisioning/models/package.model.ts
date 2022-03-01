import { SubscriptionType } from "./customer.model";

export interface IGetPackagesPayload {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}
export enum QuotaType {
  Daily = 'day',
  Weekly = 'week',
  Monthly = 'month',
  Yearly = 'year'
}
export interface IPackageItem {
  name: string;
  quotaType: QuotaType;
  perMinLimit: number;
  quotaLimit: number;
  threshold: 0;
  status: 'Active' | 'Disabled';
  createdAt: string;
  type: SubscriptionType;
  enablexpdate: number;
  id: string;
  quotaPermin?: string;
}
