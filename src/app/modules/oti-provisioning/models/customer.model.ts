export interface IGetCustomersPayload {
  page?: number;
  limit?: number;
  order?: string;
  sort?: string;
  search?: string;
  q?: string;
}

export interface ICustomer {
  _id: {
    $oid: '61e538370dcd1627ea423cea';
  };
  customerName: 'RTPD_OTI_BCKEND_SCANNING';
  companyName: 'RTPD_OTI_BCKEND_SCANNING';
  subscriptionType: 'enterprise';
  isEnable: 'Y';
  createdAt: '2021-09-28';
  custOrders: {
    currentOrder: {
      packageName: 'Custom';
    };
  };
  status: 'Suspended';
  packageName: 'Custom';
}
