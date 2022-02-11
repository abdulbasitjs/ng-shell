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
  templateUrl: './oti-provisioning-packages.component.html',
})
export class OtiProvisioningPackagesComponent implements OnInit {
  packagesDatatable!: DataTable;
  packages!: any;

  constructor(
    private dataStorageService: DataStorageService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.packagesDatatable =
      this.dataStorageService.getOtiProvisioningPackagesTableConfig();

    this.http.get(EP.Packages).subscribe((packages) => {
      this.packages = packages;
    });
  }

  onAddNewPackage() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sortBy, order]: Array<any>) {
    this.http
      .get(`${EP.Packages}?_sort=${sortBy}&_order=${order}`)
      .subscribe((packages) => {
        this.packages = packages;
      });
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }
}
