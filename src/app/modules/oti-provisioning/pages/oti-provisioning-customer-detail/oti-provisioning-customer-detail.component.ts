import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '@shared/components/app-modal/modal.service';

@Component({
  selector: 'app-oti-provisioning-customer-detail',
  templateUrl: './oti-provisioning-customer-detail.component.html',
  styleUrls: ['./oti-provisioning-customer-detail.component.scss'],
})
export class OtiProvisioningCustomerDetailComponent
  implements OnInit, AfterViewInit
{
  constructor(public modalService: ModalService) {}
  openScanModal = false;

  @ViewChild('scanStatsModal') scanStatsModal!: TemplateRef<any>;

  ngOnInit(): void {}

  showScanReport() {
    this.modalService.open(this.scanStatsModal);
    this.openScanModal = true;
  }

  onStatModalClose() {
    this.modalService.close();
    this.openScanModal = false;
  }

  ngAfterViewInit(): void {
    this.modalService.open(this.scanStatsModal);
  }
}
