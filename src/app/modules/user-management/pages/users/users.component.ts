import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Subscription } from 'rxjs';
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

  constructor(
    private umService: UserManagementService,
    private router: Router,
    private route: ActivatedRoute,
    private userMservice: UserManagementService

  ) {}

  ngOnInit(): void {
    this.usersDatatable = this.umService.getUsersTableConfig();
    this.moduleSubcription = this.userMservice.getAdminModules().subscribe(_ => {
      if (_.length) {
        this.isModuleListLoaded = true;
      }
    });
  }

  onAddNewCompany() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sortBy, order]: Array<any>) {
    // this.http
    //   .get(`${EP.Customers}?_sort=${sortBy}&_order=${order}`)
    //   .subscribe((customers) => {
    //     this.customers = customers;
    //   });
  }

  handleRow(row: Row) {
    // this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  onInviteUser() {
    this.router.navigate(['./invite'], { relativeTo: this.route });
  }
}
