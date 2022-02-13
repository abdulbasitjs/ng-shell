import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private umService: UserManagementService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usersDatatable = this.umService.getUsersTableConfig();

    // this.http.get(EP.Customers).subscribe((customres) => {
    //   this.customers = customres;
    // });
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
