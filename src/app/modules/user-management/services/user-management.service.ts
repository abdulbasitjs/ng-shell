import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';
import { EP } from '@configs/endpoints';
import { SSOResponse } from '@core/http/http-response.model';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { IModulesResponse } from '../models/modules-response.model';
import { AllRolesEnum } from '@configs/ui';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { Pagination } from '@shared/components/app-pagination/interfaces/pagination';
import { StorageService } from '@core/services/storage.service';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { IGetUsersPayload, IUserItem } from '../user-management.model';
import { HttpStatusCode } from '@core/http/http-codes.enum';
import { ToastrService } from 'ngx-toastr';

const userManagementPaginationStoreKey = `${StoragePrefix.SSO}user-management.pagination.pageSize`;
const userManagementSortStoreKey = `${StoragePrefix.SSO}user-management.sorting`;
@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  // Access Modules Used in Invitation Components
  private _modulesList: IModulesResponse[] = [];
  private modules$: BehaviorSubject<IModulesResponse[] | null> =
    new BehaviorSubject<IModulesResponse[] | null>(null);

  // User Listing
  private totalItems!: number;
  private users$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private paginationConfigSubject$!: BehaviorSubject<Pagination>;
  private isUserListLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isUserCreating$: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  public userPayload: IGetUsersPayload = {};

  // User Detail Page
  private isUserDetailLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private currentUser$: BehaviorSubject<IUserItem | null> =
    new BehaviorSubject<IUserItem | null>(null);

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private storageService: StorageService,
    private toasterService: ToastrService
  ) {
    // User Listing Configuration
    this.paginationConfigSubject$ = new BehaviorSubject<Pagination>(
      this.getUsersPaginationConfig()
    );
    const { orderBy = 'asc', sortName = 'name' } =
      this.getSortingFromStore() || {};
    this.userPayload = {
      page: 1,
      limit: this.getPageSize() || 10,
      order: orderBy,
      sort: sortName,
      search: '',
    };
  }

  // Endpoints
  getUsers(isInitial?: boolean) {
    if (isInitial) this.reset();
    this.isUserListLoading$.next(true);
    this.http
      .post(`${EP.UserListing}`, this.userPayload)
      .pipe(
        map((res) => {
          const response = <SSOResponse>res;
          this.isUserListLoading$.next(false);
          if (response.code === HttpStatusCode.Ok) {
            this.totalItems = +response.data['totalItems'];
            const totalPages = this.getTotalPages();
            this.paginationConfigSubject$.next(
              this.getUsersPaginationConfig(
                this.userPayload.page,
                this.userPayload.limit,
                totalPages
              )
            );
            this.users$.next(response.data);
            this.isUserCreating$.next(-1);
          }
          return res;
        }),
        catchError((error) => {
          this.isUserListLoading$.next(false);
          this.paginationConfigSubject$.next(
            this.paginationConfigSubject$.value
          );
          return of([]);
        })
      )
      .subscribe((d) => {});
  }

  getUser(id: string) {
    this.isUserDetailLoading$.next(true);
    this.http.post(EP.UserDetail, { id }).subscribe((res) => {
      this.isUserDetailLoading$.next(false);
      const response = <SSOResponse>res;
      if (response.code == HttpStatusCode.Ok) {
        this.currentUser$.next(response.data);
      }
    });
  }

  updateUser(payload: IUserItem) {
    return this.http.post(EP.UpdateUser, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.currentUser$.next(response.data);
          this.toasterService.success(response.message, 'Success!');
        }
        return res;
      })
    );
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

  getAdminModules(): Observable<IModulesResponse[]> {
    if (!this._modulesList.length) {
      return this.getModulesAsync().pipe(
        map((el) => this._filterAdminModules(el))
      );
    }
    return of(this._filterAdminModules(this._modulesList));
  }

  sendInvite(payload: any) {
    this.isUserCreating$.next(1);
    return this.http.post(EP.CreateUser, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.isUserCreating$.next(0);
          this.getUsers();
        }
        return res;
      })
    );
  }

  deleteUser(id: number) {
    return this.http.post(EP.DeleteUser, { id: id.toString() }).pipe(
      map((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(response.message, 'Success!');
          this.getUsers();
          return { ok: true };
        }
        return res;
      })
    );
  }

  // Helper Methods
  private _filterAdminModules(data: IModulesResponse[]): IModulesResponse[] {
    const permissions = this.auth.getPermissions();
    const keys = Object.keys(permissions).filter(
      (key) =>
        permissions[key].r === AllRolesEnum.SuperAdmin ||
        permissions[key].r === AllRolesEnum.Admin
    );
    return data.filter((el) => keys.includes(el.name));
  }

  setUserPayload(payload: IGetUsersPayload) {
    this.userPayload = payload;
  }

  getUserPayload() {
    return this.userPayload;
  }

  getTotalPages() {
    if (this.userPayload.limit)
      return Math.ceil(this.totalItems / this.userPayload.limit);
    return 1;
  }

  setPageSize(size: number) {
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, size));
    this.storageService.set(userManagementPaginationStoreKey, size);
  }

  getPageSize() {
    const limit =
      +this.storageService.get(userManagementPaginationStoreKey) || 10;
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, limit));
    return +this.storageService.get(userManagementPaginationStoreKey);
  }

  getSortingFromStore() {
    return this.storageService.get(userManagementSortStoreKey);
  }

  setSortingToStore(sortName: string, orderBy: string) {
    this.storageService.set(userManagementSortStoreKey, { sortName, orderBy });
  }

  reset() {
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, 10, 1));
    const updated = {
      ...this.userPayload,
      page: 1,
    };
    this.setUserPayload(updated);
  }

  // Observables
  getModulesObservable() {
    return this.modules$.asObservable();
  }

  getPaginationConfigObservable() {
    return this.paginationConfigSubject$.asObservable();
  }

  isUserListLoadingObservable() {
    return this.isUserListLoading$.asObservable();
  }

  getUsersObservable() {
    return this.users$.asObservable();
  }

  sendingInviteObservable() {
    return this.isUserCreating$.asObservable();
  }

  getUserDetailLoadingObservable() {
    return this.isUserDetailLoading$.asObservable();
  }

  getUserObservable() {
    return this.currentUser$.asObservable();
  }

  getInviteSendingObserVable() {
    return this.isUserCreating$.asObservable();
  }

  // Configs
  getUsersTableConfig(): DataTable {
    const { sortName = '', orderBy = Order.Default } =
      this.getSortingFromStore() || {};
    const configurations = {
      get totalColumns() {
        return configurations.headers.list.length;
      },
      headers: {
        get columnsTemplate() {
          return configurations.headers.list.reduce((acc: string, el: any) => {
            acc += ` minmax(min-content, ${el.width || '1fr'}) `;
            return acc;
          }, '');
        },
        list: [
          { name: 'Sr. #', accessor: 'id', width: '10rem' },
          {
            name: 'Full Name',
            accessor: 'name',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Email',
            accessor: 'email',
            isSortable: true,
            renderIcon: true,
            width: '2fr',
          },
          {
            name: 'Assigned Portals',
            accessor: 'permission',
            cell: 'portalTemplate',
            width: '2fr',
          },
          {
            name: 'Created on',
            accessor: 'createdAt',
            isSortable: true,
            renderIcon: true,
          },
          { name: 'Status', accessor: 'status' },
        ],
        sortBy: sortName,
        order: orderBy,
      },
      data: [],
      pagination: true,
    };
    return configurations;
  }

  getUsersPaginationConfig(
    cPage?: number,
    limit?: number,
    totalPages?: number
  ): Pagination {
    return {
      label: 'Showing',
      currentPage: cPage || 1,
      windowRange: 3,
      breakMargin: 2,
      breakLabel: '...',
      totalPages: totalPages || 1,
      recordRanges: [10, 20, 30, 50, 100],
      pageSize: limit || 10,
    };
  }
}
