import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EP, IDropdown, ClassifierList } from '@configs/index';
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
import { BehaviorSubject, catchError, delay, map, of } from 'rxjs';
import { IGetCustomersPayload } from '../models/customer.model';

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

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private toasterService: ToastrService
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
      .get(EP.Customers, {
        params: {
          _page: this.customerPayload.page,
          _limit: this.customerPayload.limit,
          _sort: this.customerPayload.sort,
          _order: this.customerPayload.order,
          q: this.customerPayload.search,
        },
        observe: 'response',
      })
      .pipe(
        map((res) => {
          this.isCustomerListIsLoading$.next(false);
          // if (response.code === HttpStatusCode.Ok) {
          // this.totalItems = +response.data['totalItems'];
          this.totalItems = +res.headers.get('X-Total-Count')!;
          const totalPages = this.getTotalPages();
          this.paginationConfigSubject$.next(
            this.getUsersPaginationConfig(
              this.customerPayload.page,
              this.customerPayload.limit,
              totalPages
            )
          );
          this.customers$.next(res.body);
          this.isCustomerCreating$.next(-1);
          // }
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

  getCustomerKey() {
    this.isCustomerKeyIsFetching$.next(true);
    return of(true).pipe(
      delay(500),
      map((_) => {
        this.isCustomerKeyIsFetching$.next(false);
        return Date.now().toString(36) + Math.random().toString(36);
      })
    );
  }

  getClassifierList() {
    this.isClassifierListIsFetching$.next(true);
    return of(true).pipe(
      delay(1000),
      map((_) => {
        this.isClassifierListIsFetching$.next(false);
        this.classfierList$.next(ClassifierList);
      })
    ).subscribe(_ => {});
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
    };
    const customSelection = {
      label: 'Custom',
      value: 'custom',
      active: activeIndex === LEN + 1,
    };
    const ratePerminList = [];
    for (let i = 1; i <= LEN; i++) {
      ratePerminList.push({
        value: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        label: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        active: i === activeIndex,
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

  getCustomerKeyFetchingObservable() {
    return this.isCustomerKeyIsFetching$.asObservable();
  }

  getClassifiersObservable() {
    return this.classfierList$.asObservable();
  }

  creatingUserObservable() {
    return this.isCustomerCreating$.asObservable();
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
            name: 'Customers',
            accessor: 'customer',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Subscription Type',
            accessor: 'subscription',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Package',
            accessor: 'package',
            isSortable: true,
            renderIcon: true,
          },
          {
            name: 'Created On',
            accessor: 'created',
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
