import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Pagination } from '@shared/components/app-pagination/interfaces/pagination';
import { UserManagementService } from '../../services/user-management.service';
import { IGetUsersPayload } from '../../user-management.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  host: {
    class: 'user-management',
  },
})
export class UsersComponent implements OnInit {
  usersDatatable!: DataTable;
  users!: any;
  moduleSubcription!: Subscription;
  isModuleListLoaded = false;
  isUseristLoaded!: boolean;

  userPayload: IGetUsersPayload = {};

  constructor(
    public umService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { orderBy = 'asc', sortName = 'name' } = this.umService.getSortingFromStore() || {};
    this.userPayload = {
      page: 1,
      limit: this.umService.getPageSize() || 10,
      order: orderBy,
      sort: sortName,
      search: '',
    };

    this.usersDatatable = this.umService.getUsersTableConfig();
    this.moduleSubcription = this.umService.getAdminModules().subscribe((_) => {
      if (_.length) {
        this.isModuleListLoaded = true;
      }
    });
    this.getUsers();
  }

  getUsers() {
    this.isUseristLoaded = false;
    this.umService.getUsers(this.userPayload);
  }

  onAddNewCompany() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sort, order]: Array<any>) {
    this.umService.setSortingToStore(sort, order);
    this.userPayload = {
      ...this.userPayload,
      sort,
      order,
    };
    this.getUsers();
  }

  handleRow(row: Row) {
    // this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  onInviteUser() {
    this.router.navigate(['./invite'], { relativeTo: this.route });
  }

  onFirst() {
    // this.getUsers(1, this.userPaginationConfig.pageSize);
  }

  onLast() {
    // const lastPage = Math.ceil(
    //   this.userPaginationConfig.totalPages / this.userPaginationConfig.pageSize
    // );
    // this.getUsers(lastPage, this.userPaginationConfig.pageSize);
  }

  onNext() {
    // this.getUsers(
    //   this.userPaginationConfig.currentPage + 1,
    //   this.userPaginationConfig.pageSize
    // );
  }

  onPrev() {
    // this.getUsers(
    //   this.userPaginationConfig.currentPage - 1,
    //   this.userPaginationConfig.pageSize
    // );
  }

  onPage(page: number) {
    this.userPayload = {
      ...this.userPayload,
      page,
    };
    this.getUsers();
  }

  onPageSizeSelect(size: number) {
    this.umService.setPageSize(size);
    this.userPayload = {
      ...this.userPayload,
      page: 1,
      limit: size,
    };
    this.getUsers();
  }

  onSearchTerm(term: string) {
    this.userPayload = {
      ...this.userPayload,
      search: term,
    };
    this.getUsers();
  }
}
