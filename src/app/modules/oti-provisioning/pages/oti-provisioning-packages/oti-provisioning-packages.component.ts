import { Component, OnInit } from '@angular/core';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-oti-provisioning-customers',
  templateUrl: './oti-provisioning-packages.component.html',
})
export class OtiProvisioningPackagesComponent implements OnInit {
  packagesDatatable!: DataTable;

  constructor(
    public packageService: PackageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.packagesDatatable = this.packageService.getPackagesDataTableConfig();
    this.getPackages(true);
  }

  getPackages(isIntial?: boolean) {
    this.packageService.getPackages(isIntial);
  }

  onAddNewPackage() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  handleHeaderClick([sort, order]: Array<any>) {
    this.packageService.setSortingToStore(sort, order);
    const updated = {
      ...this.packageService.packagePayload,
      sort,
      order,
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  onInviteUser() {
    this.router.navigate(['./invite'], { relativeTo: this.route });
  }

  onFirst() {
    const updated = {
      ...this.packageService.packagePayload,
      page: 1,
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  onLast() {
    const updated = {
      ...this.packageService.packagePayload,
      page: this.packageService.getTotalPages(),
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  onNext() {
    const currentPage = this.packageService.packagePayload.page;
    if (currentPage) {
      const updated = {
        ...this.packageService.packagePayload,
        page: currentPage + 1,
      };
      this.packageService.setPackagePayload(updated);
      this.getPackages();
    }
  }

  onPrev() {
    const currentPage = this.packageService.packagePayload.page;
    if (currentPage) {
      const updated = {
        ...this.packageService.packagePayload,
        page: currentPage - 1,
      };
      this.packageService.setPackagePayload(updated);
      this.getPackages();
    }
  }

  onPage(page: number) {
    const updated = {
      ...this.packageService.packagePayload,
      page,
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  onPageSizeSelect(size: number) {
    this.packageService.setPageSize(size);
    const updated = {
      ...this.packageService.packagePayload,
      page: 1,
      limit: size,
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  onSearchTerm(term: string) {
    const updated = {
      ...this.packageService.packagePayload,
      search: term,
    };
    this.packageService.setPackagePayload(updated);
    this.getPackages();
  }

  handleEnter(term: string) {
    this.onSearchTerm(term);
  }

  handleEsc(term: string) {
    this.onSearchTerm('');
  }
}
