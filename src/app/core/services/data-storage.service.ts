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

  getOtiProvisioningNewPackageSteps(): StepModel[] {
    return [
      { stepIndex: 1, isComplete: false, label: 'Package Information' },
      { stepIndex: 2, isComplete: false, label: 'Api Points' },
    ];
  }
}
