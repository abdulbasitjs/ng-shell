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
