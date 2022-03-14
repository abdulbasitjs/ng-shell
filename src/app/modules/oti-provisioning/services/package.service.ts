import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP } from '@configs/index';
import { ProjectStatusCode } from '@core/http/http-codes.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { NavigationService } from '@core/services/navigation.service';
import { StorageService } from '@core/services/storage.service';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Pagination } from '@shared/components/app-pagination/interfaces/pagination';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';
import { IGetPackagesPayload, IPackageItem } from '../models/package.model';

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
  private isPackageDetailLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private currentPackage$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public isInEditMode$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private packageStatus$: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toasterService: ToastrService,
    private navigationService: NavigationService
  ) {
    // User Listing Configuration
    this.paginationConfigSubject$ = new BehaviorSubject<Pagination>(
      this.getPackagesPaginationConfig()
    );

    const { orderBy = '', sortName = '' } = this.getSortingFromStore() || {};

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
      .post(EP.Packages, this.packagePayload)
      .pipe(
        map((res) => {
          const response = <SSOResponse>res;
          this.isPackageListIsLoading$.next(false);
          if (response.code === HttpStatusCode.Ok) {
            this.totalItems = +response.data['totalItems'];
            console.log(response.data);
            const totalPages = this.getTotalPages();
            this.paginationConfigSubject$.next(
              this.getPackagesPaginationConfig(
                this.packagePayload.page,
                this.packagePayload.limit,
                totalPages
              )
            );
            response.data.items = this.mapPackages(response.data.items);
            this.packages$.next(response.data);
            this.isPackageCreating$.next(-1);
          }
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

  mapPackages(items: IPackageItem[]) {
    return items.map((el: IPackageItem) => ({
      ...el,
      quotaPermin: this.createQuotaPerMinRate(el.perMinLimit, el.threshold),
    }));
  }

  createPackage(payload: any) {
    this.isPackageCreating$.next(1);
    return this.http.post(EP.CreatePackage, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        this.isPackageCreating$.next(0);
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(
            'Package has been created successfully',
            'Success'
          );
          this.getPackages();
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Error');
          });
          return of({ error: true });
        } else {
        }
        return res;
      })
    );
  }

  updatePackage(payload: any) {
    this.isPackageCreating$.next(1);
    return this.http.post(EP.UpdatePackage, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        this.isPackageCreating$.next(0);
        if (response.code === HttpStatusCode.Ok) {
          response.data = {
            ...response.data,
            quotaPermin: this.createQuotaPerMinRate(
              response.data.perMinLimit,
              response.data.threshold
            ),
          };
          this.currentPackage$.next(response.data);
          this.toasterService.success(
            'Package has been updated successfully',
            'Success'
          );
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Error');
          });
          return of({ error: true });
        }
        return res;
      })
    );
  }

  getPackage(id: string) {
    this.isPackageDetailLoading$.next(true);
    this.http.post(EP.PackageDetail, { id }).subscribe((res) => {
      this.isPackageDetailLoading$.next(false);
      const response = <SSOResponse>res;
      if (response.code == HttpStatusCode.Ok) {
        response.data = {
          ...response.data,
          quotaPermin: this.createQuotaPerMinRate(
            response.data.perMinLimit,
            response.data.threshold
          ),
        };
        this.currentPackage$.next(response.data);
        this.packageStatus$.next(
          response.data.status === 0 ? 'Disable' : 'Enable'
        );
      } else if (response.code === ProjectStatusCode.ValidationFailed) {
        this.navigationService.back();
      }
    });
  }

  deletePackage(id: string) {
    return this.http.post(EP.DeletePackage, { id }).pipe(
      map((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(response.message, 'Success!');
          this.getPackages();
          return { ok: true };
        }
        return res;
      })
    );
  }

  changePackageStatus(payload: any) {
    return this.http.post(EP.ChangePackageStatus, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          response.data = {
            ...response.data,
            quotaPermin: this.createQuotaPerMinRate(
              response.data.perMinLimit,
              response.data.threshold
            ),
          };
          this.currentPackage$.next(response.data);
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Error');
          });
          return of({ error: true });
        }
        return res;
      })
    );
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
    this.paginationConfigSubject$.next(
      this.getPackagesPaginationConfig(1, size)
    );
    this.storageService.set(OTIPackagePaginationStoreKey, size);
  }

  getPageSize() {
    const limit = +this.storageService.get(OTIPackagePaginationStoreKey) || 10;
    this.paginationConfigSubject$.next(
      this.getPackagesPaginationConfig(1, limit)
    );
    return limit;
  }

  getSortingFromStore() {
    return this.storageService.get(OTIPackageSortStoreKey);
  }

  setSortingToStore(sortName: string, orderBy: string) {
    this.storageService.set(OTIPackageSortStoreKey, { sortName, orderBy });
  }

  reset() {
    const limit = this.getPageSize();
    this.paginationConfigSubject$.next(
      this.getPackagesPaginationConfig(1, this.getPageSize(), 1)
    );
    const updated = {
      ...this.packagePayload,
      limit,
      page: 1,
      sort: 'createdAt',
      order: 'desc'
    };
    this.setPackagePayload(updated);
  }

  createQuotaPerMinRate(ratePerMinLimit: number, threshold: number) {
    return `${ratePerMinLimit} Calls / Min (${threshold || 'Custom'}X)`;
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

  getPackageDetailLoadingObservable() {
    return this.isPackageDetailLoading$.asObservable();
  }

  getPackageObservable() {
    return this.currentPackage$.asObservable();
  }

  getEditModeObservable() {
    return this.isInEditMode$.asObservable();
  }

  getPackageStatus() {
    return this.packageStatus$.asObservable();
  }

  // Configs
  getPackagesDataTableConfig(): DataTable {
    const { sortName = 'createdAt', orderBy = Order.Descending } =
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
            name: 'Package Name',
            accessor: 'name',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Quota Interval',
            accessor: 'quotaType',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Quota Limit',
            accessor: 'quotaLimit',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Quota/min (Rate)',
            accessor: 'quotaPermin',
            isSortable: true,
            renderIcon: true,
            width: '2fr',
          },
          {
            name: 'Status',
            accessor: 'status',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Created at',
            accessor: 'createdAt',
            isSortable: true,
            renderIcon: true,
          },
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
