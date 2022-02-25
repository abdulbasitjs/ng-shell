export interface IGetCustomersPayload {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
}

export enum SubscriptionType {
  Enterprise = 'enterprise',
  Community = 'community',
}

export enum Status {
  Active = 'active',
  Suspended = 'suspended',
  Expired = 'expired',
}

export interface ICustomer {
  id: string;
  customerName: string;
  companyName: string;
  subscriptionType: SubscriptionType;
  status: Status;
  createdAt: string;
  packageName: string;
}
