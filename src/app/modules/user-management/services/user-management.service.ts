import { Injectable } from '@angular/core';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {

  getUsersTableConfig(): DataTable {
    const configurations = {
      get totalColumns() {
        return configurations.headers.list.length;
      },
      headers: {
        list: [
          { name: 'Sr. #', accessor: 'id' },
          {
            name: 'Full Name',
            accessor: 'full_name',
            isSortable: true,
            renderIcon: true,
          },
          { name: 'Email', accessor: 'email' },
          { name: 'Assigned Portals', accessor: 'assigned_portal' },
          {
            name: 'Created on',
            accessor: 'created',
            isSortable: true,
            renderIcon: true,
          },
          { name: 'Status', accessor: 'status' },
        ],
        sortBy: '',
        order: Order.Default,
      },
      data: [],
      pagination: true,
    };
    return configurations;
  }

}
