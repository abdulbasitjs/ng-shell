import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  intervalMapping: any = {
    "day": "Daily",
    "week": "Weekly",
    "month": "Monthly",
    "year": "Yearly"
  }
  routerSubscription!: Subscription;
  packageSubscription!: Subscription;
  package: any;
  editMode!: string;

  constructor(
    public modalService: ModalService,
    private route: ActivatedRoute,
    public packageService: PackageService
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
}
