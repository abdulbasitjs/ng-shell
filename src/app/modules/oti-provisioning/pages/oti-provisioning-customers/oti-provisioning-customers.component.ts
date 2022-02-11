import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EP } from '@configs/endpoints';
import { DataStorageService } from '@core/services/data-storage.service';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oti-provisioning-customers',
  templateUrl: './oti-provisioning-customers.component.html',
  styleUrls: ['./oti-provisioning-customers.component.scss'],
})
export class OtiProvisioningCustomersComponent implements OnInit {
  customerDatatable!: DataTable;
  customers!: any;

  constructor(
    private dataStorageService: DataStorageService,
    // private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerDatatable =
      this.dataStorageService.getOtiProvisioningCustomersTableConfig();

    this.http.get(EP.Customers).subscribe((customres) => {
      this.customers = customres;
    });
  }

  onAddNewCompany() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sortBy, order]: Array<any>) {
    this.http
      .get(`${EP.Customers}?_sort=${sortBy}&_order=${order}`)
      .subscribe((customers) => {
        this.customers = customers;
      });
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }
}
