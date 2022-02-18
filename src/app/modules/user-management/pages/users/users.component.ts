import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { UserManagementService } from '../../services/user-management.service';

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

  constructor(
    public umService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
    this.umService.getUsers();
  }

  onAddNewCompany() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sort, order]: Array<any>) {
    this.umService.setSortingToStore(sort, order);
    const updated = {
      ...this.umService.userPayload,
      sort,
      order,
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  onInviteUser() {
    this.router.navigate(['./invite'], { relativeTo: this.route });
  }

  onFirst() {
    const updated = {
      ...this.umService.userPayload,
      page: 1,
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }

  onLast() {
    const updated = {
      ...this.umService.userPayload,
      page: this.umService.getTotalPages(),
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }

  onNext() {
    const currentPage = this.umService.userPayload.page;
    if (currentPage) {
      const updated = {
        ...this.umService.userPayload,
        page: currentPage + 1,
      };
      this.umService.setUserPayload(updated);
      this.getUsers();
    }
  }

  onPrev() {
    const currentPage = this.umService.userPayload.page;
    if (currentPage) {
      const updated = {
        ...this.umService.userPayload,
        page: currentPage - 1,
      };
      this.umService.setUserPayload(updated);
      this.getUsers();
    }
  }

  onPage(page: number) {
    const updated = {
      ...this.umService.userPayload,
      page,
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }

  onPageSizeSelect(size: number) {
    this.umService.setPageSize(size);
    const updated = {
      ...this.umService.userPayload,
      page: 1,
      limit: size,
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }

  onSearchTerm(term: string) {
    const updated = {
      ...this.umService.userPayload,
      search: term,
    };
    this.umService.setUserPayload(updated);
    this.getUsers();
  }
}
