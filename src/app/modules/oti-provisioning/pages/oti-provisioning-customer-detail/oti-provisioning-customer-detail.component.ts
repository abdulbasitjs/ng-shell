import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '@core/services/loader.service';
import { ModalService } from '@shared/components/app-modal/modal.service';
import { Subscription } from 'rxjs';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-oti-provisioning-customer-detail',
  templateUrl: './oti-provisioning-customer-detail.component.html',
  styleUrls: ['./oti-provisioning-customer-detail.component.scss'],
})
export class OtiProvisioningCustomerDetailComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  intervalMapping: any = {
    day: 'Daily',
    week: 'Weekly',
    month: 'Monthly',
    year: 'Yearly',
  };

  @ViewChild('scanStatsModal') scanStatsModal!: TemplateRef<any>;
  @ViewChild('suspendCompanyModalTemplate') scModal!: TemplateRef<any>;
  @ViewChild('deleteCompanyModalTemplate') dcModal!: TemplateRef<any>;
  openScanModal = false;
  customer!: any;

  routerSubscription!: Subscription;
  customerSubscription!: Subscription;

  constructor(
    public modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    public customerService: CustomerService,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    if (this.customerSubscription) this.customerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((param) => {
      this.customerService.getCustomer(param['id']);
    });

    this.customerSubscription = this.customerService
      .getCustomerObservable()
      .subscribe((customer) => {
        this.customer = customer;
      });
  }

  showScanReport() {
    this.modalService.open(this.scanStatsModal);
    this.openScanModal = true;
  }

  onStatModalClose() {
    this.modalService.close();
    this.openScanModal = false;
  }

  ngAfterViewInit(): void {
    // this.modalService.open(this.scanStatsModal);
  }

  suspend() {
    this.modalService.open(this.scModal);
  }

  onSuspend() {
    const status = this.customer.status === 'Active' ? 0 : 1;
    this.customerService
      .changeCompanyStatus({
        status,
        id: this.customer.id,
      })
      .subscribe((d) => {
        this.onModalClose();
      });
  }

  deleteCompany() {
    this.modalService.open(this.dcModal);
  }

  onDeleteCompany() {
    this.customerService.deleteCompany(this.customer.id).subscribe((res) => {
      const response = res as { ok: boolean };
      if (response && response.ok) {
        this.onModalClose();
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }

  onModalClose() {
    this.modalService.close();
  }
}
