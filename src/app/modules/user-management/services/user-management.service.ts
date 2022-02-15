import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';
import { EP } from '@configs/endpoints';
import { SSOResponse } from '@core/http/http-response.model';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
  IModulesResponse,
} from '../models/modules-response.model';
import { AllRolesEnum } from '@configs/ui';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private _modulesList: IModulesResponse[] = [];
  private modules$: BehaviorSubject<IModulesResponse[] | null> =
    new BehaviorSubject<IModulesResponse[] | null>(null);

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

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

  getModulesAsync() {
    return this.http.post(EP.UserModules, {}).pipe(
      map((res) => {
        const response = <SSOResponse>res;
        const { code, data } = response;
        if (code === 200) {
          this._modulesList = data;
          return data;
        }
      })
    );
  }

  getModules(): Observable<IModulesResponse[]> {
    if (!this._modulesList.length) {
      return this.getModulesAsync();
    }
    return of(this._modulesList);
  }

  private _filterAdminModules(data: IModulesResponse[]): IModulesResponse[] {
    const permissions = this.auth.getPermissions();
    const keys = Object.keys(permissions).filter(
      (key) =>
        permissions[key].r === AllRolesEnum.SuperAdmin ||
        permissions[key].r === AllRolesEnum.Admin
    );
    return data.filter(el => keys.includes(el.name));
  }

  getAdminModules(): Observable<IModulesResponse[]> {
    if (!this._modulesList.length) {
      return this.getModulesAsync().pipe(
        map((el) => this._filterAdminModules(el))
      );
    }
    return of(this._filterAdminModules(this._modulesList));
  }

  getModulesObservable() {
    return this.modules$.asObservable();
  }
}
