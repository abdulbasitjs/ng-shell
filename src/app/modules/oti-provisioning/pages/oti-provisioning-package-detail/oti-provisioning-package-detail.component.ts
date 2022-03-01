import {
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
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-oti-provisioning-package-detail',
  templateUrl: './oti-provisioning-package-detail.component.html',
  styleUrls: ['./oti-provisioning-package-detail.component.scss'],
})
export class OtiProvisioningPackageDetailComponent
  implements OnInit, OnDestroy
{
  @ViewChild('deletePackageModalTemplate') dcModal!: TemplateRef<any>;
  @ViewChild('suspendPackageModalTemplate') scModal!: TemplateRef<any>;

  intervalMapping: any = {
    day: 'Daily',
    week: 'Weekly',
    month: 'Monthly',
    year: 'Yearly',
  };
  routerSubscription!: Subscription;
  packageSubscription!: Subscription;
  package: any;
  editMode!: string;

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    public packageService: PackageService,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    if (this.packageSubscription) this.packageSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.routerSubscription = this.route.params.subscribe((param) => {
      this.packageService.getPackage(param['id']);
    });

    this.packageSubscription = this.packageService
      .getPackageObservable()
      .subscribe((packageInfo) => {
        this.package = packageInfo;
      });
  }

  onModalClose() {
    this.modalService.close();
  }

  deletePackage() {
    this.modalService.open(this.dcModal);
  }

  disable() {
    this.modalService.open(this.scModal);
  }

  onDisable() {
    console.log(this.package);
    const status = this.package.status === 0 ? 1 : 0;
    this.packageService
      .changePackageStatus({
        status,
        id: this.package.id,
      })
      .subscribe((d) => {
        this.onModalClose();
      });
  }

  onDeleteCompany() {
    this.packageService.deletePackage(this.package.id).subscribe((res) => {
      const response = res as { ok: boolean };
      if (response && response.ok) {
        this.onModalClose();
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}
