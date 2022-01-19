import { Injectable } from '@angular/core';
import { DataTable } from '@shared/components/app-data-table/interfaces/datatable';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor() {}

  getOtiProvisioningSidebarValues(): Sidebar[] {
    return [
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
  }

  getOtiProvisioningCustomersTableConfig(): DataTable {
    const configurations = {
      get totalColumns() {
        return configurations.headers.list.length;
      },
      headers: {
        headersIcon: 'assets/svg/table-sorting-icon.svg',
        list: [
          { name: 'Customers', accessor: 'customer' },
          { name: 'Subscription Type', accessor: 'subscription' },
          { name: 'Package', accessor: 'package' },
          { name: 'Created On', renderIcon: true, accessor: 'created' },
          { name: 'Status', accessor: 'status' }
        ],
      },
      data: [
        {
          row: {
            customer: 'JP Morgan',
            subscription: 'Customer',
            package: 'Default',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Aculity Brands',
            subscription: 'Prospect',
            package: 'Custom',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'ADT Corp',
            subscription: 'Customer',
            package: 'Custom',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Arkeia Software',
            subscription: 'Customer',
            package: 'Gold (Custom)',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'BFG Technologies',
            subscription: 'Prospect',
            package: 'Gold',
            created: '05-10-2018',
            status: 'Suspended',
          },
          disabled: true,
        },
        {
          row: {
            customer: 'Brunswick Corporation',
            subscription: 'Prospect',
            package: 'Default (Custom)',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Chevron Corporation',
            subscription: 'Customer',
            package: 'Custom',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Lifetouch Inc.',
            subscription: 'Customer',
            package: 'Custom',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Omni Air International',
            subscription: 'Prospect',
            package: 'Gold',
            created: '05-10-2018',
            status: 'Active',
          },
        },
        {
          row: {
            customer: 'Sierra Nevada Corporation',
            subscription: 'Prospect',
            package: 'Silver',
            created: '05-10-2018',
            status: 'Active',
          },
        }
      ],
    };
    return configurations;
  }

  getOtiProvisioningNewCompanySteps(): string[] {
    return ['Company Profile', 'Subscription Info', 'Exclude Classifier'];
  }

}
