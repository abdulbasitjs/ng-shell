import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP, IDropdown, ClassifierList } from '@configs/index';
import { ProjectStatusCode } from '@core/http/http-codes.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { StoragePrefix } from '@core/models/storage-prefix.enum';
import { StorageService } from '@core/services/storage.service';
import {
  DataTable,
  Order,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Pagination } from '@shared/components/app-pagination/interfaces/pagination';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, delay, map, of, tap } from 'rxjs';
import { IGetCustomersPayload } from '../models/customer.model';
import { PackageService } from './package.service';

const OTICustomersPaginationStoreKey = `${StoragePrefix.OTIProvisioning}customer.pagination.pageSize`;
const OTICustomersSortStoreKey = `${StoragePrefix.OTIProvisioning}customer.sorting`;
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  // Customer Listing
  private totalItems!: number;
  private customers$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private paginationConfigSubject$!: BehaviorSubject<Pagination>;
  private isCustomerListIsLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private isCustomerCreating$: BehaviorSubject<number> =
    new BehaviorSubject<number>(-1);
  public customerPayload: any = {};

  private rateLimitPerMin$: BehaviorSubject<IDropdown[] | []> =
    new BehaviorSubject<IDropdown[] | []>([]);

  private classfierList$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private isClassifierListIsFetching$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Add Customer
  private isCustomerKeyIsFetching$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  // Customer Detail
  private isCustomerDetailLoading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private currentCustomer$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  private customerStatus$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private customerStats$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toasterService: ToastrService,
    private packageService: PackageService
  ) {
    // User Listing Configuration
    this.paginationConfigSubject$ = new BehaviorSubject<Pagination>(
      this.getUsersPaginationConfig()
    );

    const { orderBy = '', sortName = '' } = this.getSortingFromStore() || {};

    this.customerPayload = {
      page: 1,
      limit: this.getPageSize() || 10,
      order: orderBy,
      sort: sortName,
      search: '',
    };
  }

  // Endpoints
  getCustomers(isInitial?: boolean) {
    if (isInitial) this.reset();
    this.isCustomerListIsLoading$.next(true);
    this.http
      .post(EP.Customers, this.customerPayload)
      .pipe(
        map((res) => {
          const response = <SSOResponse>res;
          this.isCustomerListIsLoading$.next(false);
          if (response.code === HttpStatusCode.Ok) {
            this.totalItems = +response.data['totalItems'];
            const totalPages = this.getTotalPages();
            this.paginationConfigSubject$.next(
              this.getUsersPaginationConfig(
                this.customerPayload.page,
                this.customerPayload.limit,
                totalPages
              )
            );
            this.customers$.next(response.data);
            this.isCustomerCreating$.next(-1);
          }
          return res;
        }),
        catchError((error) => {
          this.isCustomerListIsLoading$.next(false);
          this.paginationConfigSubject$.next(
            this.paginationConfigSubject$.value
          );
          return of([]);
        })
      )
      .subscribe((d) => {});
  }

  getCustomer(id: string) {
    this.isCustomerDetailLoading$.next(true);
    this.http.post(EP.CustomerDetail, { id }).subscribe((res) => {
      this.isCustomerDetailLoading$.next(false);
      const response = <SSOResponse>res;
      if (response.code == HttpStatusCode.Ok) {
        this.customerStatus$.next(response.data.status);
        const { packageId } = response.data.packageInformation;
        if (packageId === '0') {
          this.currentCustomer$.next(response.data);
        } else {
          this.packageService.getPackage(packageId);
          this.packageService.getPackageObservable().subscribe((data) => {
            if (data) {
              response.data.packageInformation = data;
              this.currentCustomer$.next(response.data);
            }
          });
        }
      }
    });
  }

  getCustomerStats(payload: any) {
    this.http.post(EP.CompanyStats, payload).subscribe((res) => {
      const response = <SSOResponse>res;
      if (response.code == HttpStatusCode.Ok) {
        this.customerStats$.next(response.data);
      }
    });
  }

  getCustomerKey() {
    this.isCustomerKeyIsFetching$.next(true);
    return this.http.post(EP.GenerateKey, {}).pipe(
      map((res) => {
        this.isCustomerKeyIsFetching$.next(false);
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          return response.data.key;
        }
      })
    );
  }

  getClassifierList() {
    this.isClassifierListIsFetching$.next(true);
    return of(true)
      .pipe(
        map((_) => {
          this.isClassifierListIsFetching$.next(false);
          this.classfierList$.next(ClassifierList);
        })
      )
      .subscribe((_) => {});
  }

  // Refactor later like messages stuff.
  createCompany(payload: any) {
    this.isCustomerCreating$.next(1);
    return this.http.post(EP.CreateCustomer, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        this.isCustomerCreating$.next(0);
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(
            'Company Created Successfully!🚀🚀🚀',
            'Success!'
          );
          this.getCustomers();
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Validation Failed', {
              disableTimeOut: true,
            });
          });
          return of({ error: true });
        }
        return res;
      })
    );
  }

  updateCompany(payload: any) {
    this.isCustomerCreating$.next(1);
    return this.http.post(EP.UpdateCopmany, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        this.isCustomerCreating$.next(0);
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(
            'Company Update Successfully!🚀🚀🚀',
            'Success!'
          );
          console.log(response);
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Validation Failed', {
              disableTimeOut: true,
            });
          });
          return of({ error: true });
        } else if (response.code === ProjectStatusCode.ScriptBroken) {
          this.toasterService.error(response.message, 'Script Failed🐛🐛');
        }
        return res;
      })
    );
  }

  deleteCompany(id: string) {
    return this.http.post(EP.DeleteCompany, { id }).pipe(
      map((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.toasterService.success(response.message, 'Success!');
          this.getCustomers();
          return { ok: true };
        }
        return res;
      })
    );
  }

  changeCompanyStatus(payload: any) {
    return this.http.post(EP.CustomerChangeStatus, payload).pipe(
      tap((res) => {
        const response = <SSOResponse>res;
        if (response.code === HttpStatusCode.Ok) {
          this.customerStatus$.next(
            payload.status === 0 ? 'Reactive' : 'Active'
          );
        } else if (response.code === ProjectStatusCode.ValidationFailed) {
          const errors = Object.keys(response.message)
            .map((el: any) => response.message[el])
            .flat();
          errors.forEach((e) => {
            this.toasterService.error(e, 'Validation Failed', {
              disableTimeOut: true,
            });
          });
          return of({ error: true });
        }
        return res;
      })
    );
  }

  // Helper Methods
  setCustomerPayload(payload: IGetCustomersPayload) {
    this.customerPayload = payload;
  }

  getTotalPages() {
    if (this.customerPayload.limit)
      return Math.ceil(this.totalItems / this.customerPayload.limit);
    return 1;
  }

  setPageSize(size: number) {
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, size));
    this.storageService.set(OTICustomersPaginationStoreKey, size);
  }

  getPageSize() {
    const limit =
      +this.storageService.get(OTICustomersPaginationStoreKey) || 10;
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, limit));
    return +this.storageService.get(OTICustomersPaginationStoreKey);
  }

  getSortingFromStore() {
    return this.storageService.get(OTICustomersSortStoreKey);
  }

  setSortingToStore(sortName: string, orderBy: string) {
    this.storageService.set(OTICustomersSortStoreKey, { sortName, orderBy });
  }

  reset() {
    this.paginationConfigSubject$.next(this.getUsersPaginationConfig(1, 10, 1));
    const updated = {
      ...this.customerPayload,
      page: 1,
    };
    this.setCustomerPayload(updated);
  }

  generateRatePerMinList(
    quotaLimit: number,
    intervalVal: number,
    activeIndex: number = -1
  ) {
    const LEN = 10;
    const originalRate = quotaLimit / intervalVal;
    const defaultSelection = {
      label: 'Select Rate Limit / Min',
      value: 'default',
      active: activeIndex === 0,
      index: 0,
    };
    const customSelection = {
      label: 'Custom',
      value: 'custom',
      active: activeIndex === LEN + 1,
      index: LEN + 1,
    };
    const ratePerminList = [];
    for (let i = 1; i <= LEN; i++) {
      ratePerminList.push({
        value: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        label: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        active: i === activeIndex,
        index: i,
      });
    }
    this.rateLimitPerMin$.next([
      defaultSelection,
      ...ratePerminList,
      customSelection,
    ]);
  }

  // Observables

  getPaginationConfigObservable() {
    return this.paginationConfigSubject$.asObservable();
  }

  isCustomerListLoadingObservable() {
    return this.isCustomerListIsLoading$.asObservable();
  }

  isClassifierListIsFetching() {
    return this.isClassifierListIsFetching$.asObservable();
  }

  getCustomersObservable() {
    return this.customers$.asObservable();
  }

  getCompanyStatus() {
    return this.customerStatus$.asObservable();
  }

  getCustomerKeyFetchingObservable() {
    return this.isCustomerKeyIsFetching$.asObservable();
  }

  getClassifiersObservable() {
    return this.classfierList$.asObservable();
  }

  creatingCustomerObservable() {
    return this.isCustomerCreating$.asObservable();
  }

  getCustomerDetailLoadingObservable() {
    return this.isCustomerDetailLoading$.asObservable();
  }

  getCustomerObservable() {
    return this.currentCustomer$.asObservable();
  }

  getCustomerStatsObservable() {
    return this.customerStats$.asObservable();
  }

  getInviteSendingObserVable() {
    // return this.isUserCreating$.asObservable();
  }

  getRatePerLimitMinListObservable() {
    return this.rateLimitPerMin$.asObservable();
  }

  // Configs
  getCustomersDataTableConfig(): DataTable {
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
          {
            name: 'Company',
            accessor: 'companyName',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Subscription Type',
            accessor: 'subscriptionType',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Package',
            accessor: 'packageName',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Created On',
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

  getAddNewCompanySteps(): StepModel[] {
    return [
      { stepIndex: 1, isComplete: false, label: 'Company Profile' },
      { stepIndex: 2, isComplete: false, label: 'Subscription Info' },
      { stepIndex: 3, isComplete: false, label: 'Exclude Classifier' },
    ];
  }
}
