import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTable, Order } from '@shared/components/app-data-table/interfaces/datatable';
import { Sidebar } from '@shared/components/app-side-bar/interfaces/sidebar';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http:HttpClient) {}

  _getCustomers() {
      return this.http.get('http://localhost:3000/customers');
  }

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
        list: [
          { name: 'Customers', accessor: 'customer', isSortable: true, renderIcon: true },
          { name: 'Subscription Type', accessor: 'subscription', isSortable: true, renderIcon: true },
          { name: 'Package', accessor: 'package', isSortable: true, renderIcon: true },
          { name: 'Created On', accessor: 'created', isSortable: true, renderIcon: true },
          { name: 'Status', accessor: 'status' }
        ],
        sortBy: '',
        order: Order.Default
      },
      data: [],
      pagination: true,
    };
    return configurations;
  }

  getOtiProvisioningPackagesTableConfig(): DataTable {
    const configurations = {
      get totalColumns() {
        return configurations.headers.list.length;
      },
      headers: {
        list: [
          { name: 'Sr. #', accessor: 'id' },
          { name: 'Package Name', accessor: 'package_name', isSortable: true, renderIcon: true },
          { name: 'Quota Interval', accessor: 'quota_interval' },
          { name: 'Quota Limit', accessor: 'quota_limit' },
          { name: 'Quota/min (Rate)', accessor: 'quota_permin' },
          { name: 'Status', accessor: 'status' },
          { name: 'Created at', accessor: 'created', isSortable: true, renderIcon: true },
        ],
        sortBy: '',
        order: Order.Default
      },
      data: [],
      pagination: true,
    };
    return configurations;
  }

  getOtiProvisioningNewCompanySteps(): StepModel[] {
    return [
      { stepIndex: 1, isComplete: false, label: 'Company Profile' },
      { stepIndex: 2, isComplete: false, label: 'Subscription Info' },
      { stepIndex: 3, isComplete: false, label: 'Exclude Classifier' },
    ];
  }

  getOtiProvisioningNewPackageSteps(): StepModel[] {
    return [
      { stepIndex: 1, isComplete: false, label: 'Package Information' },
      { stepIndex: 2, isComplete: false, label: 'Api Points' },
    ];
  }
}
