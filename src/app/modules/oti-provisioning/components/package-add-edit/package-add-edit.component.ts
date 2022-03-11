import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UIMESSAGES,
  QuotaInterval,
  RateLimitOptions,
  IDropdown,
  QuotaType,
} from '@configs/index';
import { ProjectStatusCode } from '@core/http/http-codes.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { LoaderService } from '@core/services/loader.service';
import { OverlayService } from '@core/services/overlay.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { PackageService } from '../../services/package.service';

const DefaultSelction = {
  label: '',
  value: 'default',
  active: false,
  index: 0,
};
const RATE_LIMIT_LEN = 12;
@Component({
  selector: 'app-package-add-edit',
  templateUrl: './package-add-edit.component.html',
})
export class AppPackageAddEditComponent implements OnInit, OnDestroy {
  attempts = 0;
  editMode = false;
  CUSTOM_KEY = 'custom';
  DEFAULT_LABEL = 'Select Rate Limit / Min';
  intervalMapping: any = {
    day: 'daily',
    week: 'weekly',
    month: 'monthly',
    year: 'yearly',
  };

  UIMSG = UIMESSAGES;
  quotaIntervalList = QuotaInterval;
  rateLimitPerMinList = RateLimitOptions;

  isPanelOpen: boolean = true;
  package!: any;
  packageForm!: FormGroup;
  rateLimitSubscription!: Subscription;
  routerSubscription!: Subscription;
  packageSubscription!: Subscription;
  public lastSelection$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private overlayService: OverlayService,
    public loaderService: LoaderService,
    private packageService: PackageService
  ) {}

  ngOnDestroy(): void {
    this.overlayService.hideOverlay();
  }

  ngOnInit(): void {
    this.overlayService.showOverlay();
    this.populatePackageForm();
    this.detectFormChanges();
    this.getLastSelection();
    this.routerSubscription = this.route.params.subscribe((param) => {
      this.editMode = param['mode'] === 'edit';
      if (this.editMode) {
        this.initializeEditMode();
      }
    });
  }

  initializeEditMode() {
    this.packageSubscription = this.packageService
      .getPackageObservable()
      .subscribe((packageInfo) => {
        if (packageInfo) {
          this.package = packageInfo;
          this.populateEditForm();
        }
      });
  }

  populateEditForm() {
    const { name, quotaType, perMinLimit, threshold, quotaLimit, quotaPermin } =
      this.package;

    let payload: any = {
      packageName: name,
      package_info: {
        quota_limit: quotaLimit,
      },
    };

    const rate_limit = {
      label: '',
      active: true,
      value: '',
      index: threshold,
    };

    if (threshold === 0) {
      payload.package_info.quota_permin = perMinLimit;
      rate_limit.index = RATE_LIMIT_LEN - 1;
    }

    if (this.packageForm) {
      this.packageForm.patchValue(payload);
    }

    this.lastSelection$.next({
      quota_interval: {
        label: '',
        value: this.intervalMapping[quotaType],
        active: true,
      },
      rate_limit,
    });
  }

  populatePackageForm() {
    this.packageForm = this.formBuilder.group({
      packageName: ['', Validators.required],
      package_info: this.formBuilder.group({
        quota_interval: this.createGroup(DefaultSelction),
        quota_limit: [1, Validators.required],
        rate_limit: this.createGroup(DefaultSelction),
        quota_permin: [''],
      }),
    });
  }

  monitorRateLimitChanges() {
    this.rateLimitSubscription = <Subscription>(
      this.packageForm
        ?.get('package_info.rate_limit')
        ?.valueChanges.subscribe((ratePerMin: any) => {
          if (ratePerMin.value === this.CUSTOM_KEY) {
            this.quotaPerMinControl?.setValidators([Validators.required]);
          } else {
            this.quotaPerMinControl?.clearValidators();
            this.attempts += 1;
            this.packageForm?.get('package_info')?.patchValue({
              quota_permin: this.editMode && this.attempts === 1 ? this.package?.perMinLimit : '',
            });
          }
          this.quotaPerMinControl?.updateValueAndValidity();
        })
    );
  }

  createGroup(item: IDropdown) {
    return this.formBuilder.group({
      ...item,
      name: [item.label],
    });
  }

  resetPackInfoGroup() {
    this.packageForm.get('package_info')?.patchValue({
      quota_interval: this.createGroup({
        key: '',
        label: '',
        value: 'daily',
        active: true,
      }),
      quota_limit: [1],
      rate_limit: this.createGroup({
        key: '',
        label: '',
        value: 'default',
        active: true,
      }),
      quota_permin: [''],
    });
  }

  detectFormChanges() {
    this.monitorRateLimitChanges();
  }

  getLastSelection() {
    const { quota_interval, rate_limit } = this.packageForm.value.package_info;
    this.lastSelection$.next({
      quota_interval,
      rate_limit,
    });
  }

  onAddNewPackage() {}

  handleQuotaIntervalSelect(item: any) {
    this.packageForm.controls['package_info'].patchValue({
      quota_interval: item.label,
    });
  }

  onSave() {
    const payload: any = this.createPayload();
    if (!this.editMode) {
      this.packageService.createPackage(payload).subscribe((d) => {
        const res = <SSOResponse>d;
        if (res.code !== ProjectStatusCode.ValidationFailed) {
          this.onClose();
        }
      });
    } else {
      payload.id = this.package.id;
      payload.status = this.package.status;
      this.packageService.updatePackage(payload).subscribe((d) => {
        const res = <SSOResponse>d;
        if (res.code !== ProjectStatusCode.ValidationFailed) {
          this.onClose();
        }
      });
    }
  }

  createPayload() {
    const { package_info, packageName } = this.packageForm.value;
    let threashold = 0;
    let {
      quota_limit: quotaLimit,
      quota_interval: { name: quotaType },
      rate_limit: { value: rName },
      quota_permin: perMinLimit,
    } = package_info;

    if (rName !== this.CUSTOM_KEY) {
      [perMinLimit, threashold] = rName.match(/\d+/g);
    }

    const payload = {
      packageName,
      quotaLimit: +quotaLimit,
      quotaType: QuotaType[quotaType],
      perMinLimit: +perMinLimit,
      threshold: threashold,
    };

    return payload;
  }

  onClose() {
    this.isPanelOpen = false;
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  get quotaPerMinControl() {
    return (this.packageForm.controls['package_info'] as FormGroup).controls[
      'quota_permin'
    ] as FormControl;
  }

  get quotaLimitControl() {
    return (this.packageForm.controls['package_info'] as FormGroup).controls[
      'quota_limit'
    ] as FormControl;
  }

  get rateControl() {
    return (this.packageForm.controls['package_info'] as FormGroup).controls[
      'rate_limit'
    ] as FormControl;
  }
}
