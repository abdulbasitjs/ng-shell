import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { DataTableService } from '@shared/components/app-data-table/app-datatable.service';

@Component({
  selector: 'app-oti-provisioning-customers',
  templateUrl: './oti-provisioning-customers.component.html',
  styleUrls: ['./oti-provisioning-customers.component.scss'],
})
export class OtiProvisioningCustomersComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('companyStatus') csTemplate!: TemplateRef<any>;
  @ViewChild('packageName') pnTemplate!: TemplateRef<any>;
  customerDatatable!: DataTable;
  customers!: any;

  constructor(
    public customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private dtService: DataTableService
  ) {}

  ngAfterViewInit(): void {
    this.dtService.addTemplate('companyStatus', this.csTemplate);
    this.dtService.addTemplate('packageName', this.pnTemplate);
  }

  ngOnInit(): void {
    this.customerDatatable = this.customerService.getCustomersDataTableConfig();
    this.customerService.getCustomers(true);
  }

  getCustomers(isIntial?: boolean) {
    this.customerService.getCustomers(isIntial);
  }

  handleHeaderClick([sort, order]: Array<any>) {
    this.customerService.setSortingToStore(sort, order);
    const updated = {
      ...this.customerService.customerPayload,
      page: 1,
      sort,
      order,
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  onAddNewCompany() {
    this.router.navigate(['./add'], { relativeTo: this.route });
  }

  onFirst() {
    const updated = {
      ...this.customerService.customerPayload,
      page: 1,
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  onLast() {
    const updated = {
      ...this.customerService.customerPayload,
      page: this.customerService.getTotalPages(),
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  onNext() {
    const currentPage = this.customerService.customerPayload.page;
    if (currentPage) {
      const updated = {
        ...this.customerService.customerPayload,
        page: currentPage + 1,
      };
      this.customerService.setCustomerPayload(updated);
      this.getCustomers();
    }
  }

  onPrev() {
    const currentPage = this.customerService.customerPayload.page;
    if (currentPage) {
      const updated = {
        ...this.customerService.customerPayload,
        page: currentPage - 1,
      };
      this.customerService.setCustomerPayload(updated);
      this.getCustomers();
    }
  }

  onPage(page: number) {
    const updated = {
      ...this.customerService.customerPayload,
      page,
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  onPageSizeSelect(size: number) {
    this.customerService.setPageSize(size);
    const updated = {
      ...this.customerService.customerPayload,
      page: 1,
      limit: size,
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  onSearchTerm(term: string) {
    const updated = {
      ...this.customerService.customerPayload,
      search: term,
    };
    this.customerService.setCustomerPayload(updated);
    this.getCustomers();
  }

  handleEnter(term: string) {
    this.onSearchTerm(term);
  }

  handleEsc(term: string) {
    this.onSearchTerm('');
  }
}
