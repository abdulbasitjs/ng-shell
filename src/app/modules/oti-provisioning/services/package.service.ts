import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP } from '@configs/index';
import { SSOResponse } from '@core/http/http-response.model';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { StorageService } from '@core/services/storage.service';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Pagination } from '@shared/components/app-pagination/interfaces/pagination';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { IGetPackagesPayload } from '../models/package.model';

const OTIPackagePaginationStoreKey = `${StoragePrefix.OTIProvisioning}package.pagination.pageSize`;
const OTIPackageSortStoreKey = `${StoragePrefix.OTIProvisioning}package.sorting`;

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  // Package Listing
  private totalItems!: number;
  private packages$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private paginationConfigSubject$!: BehaviorSubject<Pagination>;
  private isPackageListIsLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isPackageCreating$: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  public packagePayload: any = {};

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toasterService: ToastrService
  ) {
    // User Listing Configuration
    this.paginationConfigSubject$ = new BehaviorSubject<Pagination>(
      this.getPackagesPaginationConfig()
    );

    const { orderBy = '', sortName = '' } =
      this.getSortingFromStore() || {};

    this.packagePayload = {
      page: 1,
      limit: this.getPageSize() || 10,
      order: orderBy,
      sort: sortName,
      search: '',
    };
  }

  // Endpoints
  getPackages(isInitial?: boolean) {
    if (isInitial) this.reset();
    this.isPackageListIsLoading$.next(true);
    this.http
      .get(EP.Packages, {
        params: {
          _page: this.packagePayload.page,
          _limit: this.packagePayload.limit,
          _sort: this.packagePayload.sort,
          _order: this.packagePayload.order,
          q: this.packagePayload.search,
        },
        observe: 'response',
      })
      .pipe(
        map((res) => {
          this.isPackageListIsLoading$.next(false);
          // if (response.code === HttpStatusCode.Ok) {
          // this.totalItems = +response.data['totalItems'];
          this.totalItems = +res.headers.get('X-Total-Count')!;
          const totalPages = this.getTotalPages();
          this.paginationConfigSubject$.next(
            this.getPackagesPaginationConfig(
              this.packagePayload.page,
              this.packagePayload.limit,
              totalPages
            )
          );
          this.packages$.next(res.body);
          this.isPackageCreating$.next(-1);
          // }
          return res;
        }),
        catchError((error) => {
          this.isPackageListIsLoading$.next(false);
          this.paginationConfigSubject$.next(
            this.paginationConfigSubject$.value
          );
          return of([]);
        })
      )
      .subscribe((d) => {});
  }

  // Helper Methods
  setPackagePayload(payload: IGetPackagesPayload) {
    this.packagePayload = payload;
  }

  getTotalPages() {
    if (this.packagePayload.limit)
      return Math.ceil(this.totalItems / this.packagePayload.limit);
    return 1;
  }

  setPageSize(size: number) {
    this.paginationConfigSubject$.next(this.getPackagesPaginationConfig(1, size));
    this.storageService.set(OTIPackagePaginationStoreKey, size);
  }

  getPageSize() {
    const limit =
      +this.storageService.get(OTIPackagePaginationStoreKey) || 10;
    this.paginationConfigSubject$.next(this.getPackagesPaginationConfig(1, limit));
    return +this.storageService.get(OTIPackagePaginationStoreKey);
  }

  getSortingFromStore() {
    return this.storageService.get(OTIPackageSortStoreKey);
  }

  setSortingToStore(sortName: string, orderBy: string) {
    this.storageService.set(OTIPackageSortStoreKey, { sortName, orderBy });
  }

  reset() {
    this.paginationConfigSubject$.next(this.getPackagesPaginationConfig(1, 10, 1));
    const updated = {
      ...this.packagePayload,
      page: 1,
    };
    this.setPackagePayload(updated);
  }

  // Observables

  getPaginationConfigObservable() {
    return this.paginationConfigSubject$.asObservable();
  }

  isPackageListLoadingObservable() {
    return this.isPackageListIsLoading$.asObservable();
  }

  getPackagesObservable() {
    return this.packages$.asObservable();
  }

  creatingPackageObservable() {
    return this.isPackageCreating$.asObservable();
  }

  getUserDetailLoadingObservable() {
    // return this.isUserDetailLoading$.asObservable();
  }

  getUserObservable() {
    // return this.currentUser$.asObservable();
  }

  getInviteSendingObserVable() {
    // return this.isUserCreating$.asObservable();
  }

  // Configs
  getPackagesDataTableConfig(): DataTable {
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
          { name: 'Sr. #', accessor: 'id' },
          { name: 'Package Name', accessor: 'package_name', isSortable: true, renderIcon: true },
          { name: 'Quota Interval', accessor: 'quota_interval' },
          { name: 'Quota Limit', accessor: 'quota_limit' },
          { name: 'Quota/min (Rate)', accessor: 'quota_permin' },
          { name: 'Status', accessor: 'status' },
          { name: 'Created at', accessor: 'created', isSortable: true, renderIcon: true },
        ],
        sortBy: sortName,
        order: orderBy,
      },
      data: [],
      pagination: true,
    };
    return configurations;
  }

  getPackagesPaginationConfig(
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
