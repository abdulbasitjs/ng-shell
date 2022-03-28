import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';
import { CustomerService } from '../../services/customer.service';
import { PackageService } from '../../services/package.service';
import { Subscription, map, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import {
  ExpDates,
  SubscriptionTypes,
  IDropdown,
  IRadio,
  QuotaType,
} from '@configs/index';
import { IPackageItem } from '../../models/package.model';
import { LoaderService } from '@core/services/loader.service';
import { ProjectStatusCode } from '@core/http/http-codes.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { OverlayService } from '@core/services/overlay.service';

const Active = 'Active';
const DefaultSelction = {
  label: '',
  value: 'default',
  active: false,
  index: 0,
};
const COMPANY_PREFIX = 'SNXCUST-';
const RATE_LIMIT_LEN = 12;

@Component({
  selector: 'app-customer-quota-edit',
  templateUrl: './quota-edit.component.html',
})
export class AppCustomerQuotaEditComponent implements OnInit, OnDestroy {
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

  subscriptionTypes = SubscriptionTypes;
  expDates = ExpDates;
  classifierList = [];
  errors: Array<string> = [];

  steps!: StepModel[];
  isPanelOpen: boolean = true;
  activeStep!: StepModel;

  packagesSubscription!: Subscription;
  customerKeySubscription!: Subscription;
  subTypeSubscription!: Subscription;
  companyNameSubscription!: Subscription;
  expirydateValidationSubscription!: Subscription;
  tierSubscription!: Subscription;
  rateLimitSubscription!: Subscription;
  classifierListSubscription!: Subscription;
  routerSubscription!: Subscription;
  customerSubscription!: Subscription;

  packages!: IPackageItem[];
  tiers = [{ key: '', value: '', type: '', id: '', enablexpdate: -1 }];
  expiryDateFormat = {
    format: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
  };
  isTiersLoading = false;
  shouldEnableExpiryDate = false;

  newCompanyForm!: FormGroup;
  customer: any;
  public lastSelection$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    public customerService: CustomerService,
    public packageService: PackageService,
    public loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  // Life Cycle Hooks
  ngOnDestroy(): void {
    if (this.packagesSubscription) this.packagesSubscription.unsubscribe();
    if (this.customerKeySubscription)
      this.customerKeySubscription.unsubscribe();
    if (this.subTypeSubscription) this.subTypeSubscription.unsubscribe();
    if (this.companyNameSubscription)
      this.companyNameSubscription.unsubscribe();
    if (this.expirydateValidationSubscription)
      this.expirydateValidationSubscription.unsubscribe();
    if (this.tierSubscription) this.tierSubscription.unsubscribe();
    if (this.classifierListSubscription)
      this.classifierListSubscription.unsubscribe();
    this.overlayService.hideOverlay();
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.overlayService.showOverlay();
    this.steps = this.customerService.getAddNewCompanySteps();
    this.activeStep = this.steps[0];
    this.getPackges();
    this.populateCompanyForm();
    this.detectFormChanges();
    this.getClassifiers();
    this.getLastSelection();
    this.routerSubscription = this.route.params.subscribe((param) => {
      this.editMode = param['mode'] === 'edit';
      if (this.editMode) {
        this.initializeEditMode();
      } else {
        this.fetchCustomerKey();
      }
    });
  }

  // Endpoints
  fetchCustomerKey() {
    this.customerKeySubscription = this.customerService
      .getCustomerKey()
      .subscribe((key) => {
        this.newCompanyForm.get('subscription')?.patchValue({
          company_key: key,
        });
      });
  }

  reGenerateCustomerKey(event: Event) {
    event.preventDefault();
    this.fetchCustomerKey();
  }

  getPackges() {
    this.isTiersLoading = true;
    const { limit } = this.packageService.packagePayload;
    const updatedPayload = {
      ...this.packageService.packagePayload,
      limit: 1000,
    };
    this.packageService.setPackagePayload(updatedPayload);
    this.packageService.getPackages();
    this.packagesSubscription = this.packageService
      .getPackagesObservable()
      .subscribe((packages) => {
        if (packages) {
          this.packages = packages.items;
          this.createTiers();
        }
      });
  }

  getClassifiers() {
    this.customerService.getClassifierList();
    this.customerService.getClassifiersObservable().subscribe((list) => {
      if (!this.classifierList.length) {
        this.classifierList = list;
        list.map((el: any, i: number) => {
          this.classifiersListArray.push(this.createGroupForCheckBox(el, i));
        });
      }
    });
  }

  // Form Helpers

  initializeEditMode() {
    this.customerSubscription = this.customerService
      .getCustomerObservable()
      .subscribe((customer) => {
        if (customer) {
          this.customer = customer;
          this.populateEditForm();
        }
      });
  }

  populateEditForm() {
    this.populateProfileSection();
    this.populateSubscriptionSection();
    this.populatePackageSection();
    this.populateClassifierSection();
  }

  populateProfileSection() {
    this.newCompanyForm.get('profile')?.patchValue({
      company_name: this.customer?.companyName,
      customer_name: this.customer?.customerName,
      email: this.customer?.recipients,
      address: this.customer?.address,
      contact_no: this.customer?.contactNo,
      salesforce_id: this.customer?.salesforceId,
    });
  }

  populateSubscriptionSection() {
    const expTypeIdx = this.customer?.expiryDate === '2090-12-12' ? 0 : 1;
    this.newCompanyForm.get('subscription')?.patchValue({
      company_id: this.customer?.custId,
      type: this.customer?.subscriptionType,
      company_key: this.customer?.key,
      exp_date_type: this.expDates[expTypeIdx].key,
      expiry_date: {
        startDate: moment(this.customer?.expiryDate),
        endDate: moment(this.customer?.expiryDate),
      },
    });

    if (this.customer) {
      this.setTierDefaultSelection(
        this.customer?.packageInformation?.packageId,
        this.subType?.value
      );
    }
  }

  populatePackageSection() {
    const { name, quotaType, perMinLimit, threshold, quotaLimit, quotaPermin } =
      this.customer?.packageInformation;

    let payload: any = {
      quota_limit: quotaLimit,
    };

    const rate_limit = {
      label: '',
      active: true,
      value: '',
      index: threshold,
    };

    if (threshold === 0) {
      payload.quota_permin = perMinLimit;
      rate_limit.index = RATE_LIMIT_LEN - 1;
    }

    if (this.packageGroup) {
      this.packageGroup?.patchValue(payload);
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

  populateClassifierSection() {
    const cf = (this.customer?.custExculClassifiers).split(',');
    if (cf.length) {
      cf.forEach((el: string) => {
        this.classifiersListArray.controls.forEach((ctrl) => {
          if (ctrl.value.key === el) {
            ctrl.patchValue({
              modelKey: true,
            });
          }
        });
      });
    }
  }

  populateCompanyForm() {
    this.newCompanyForm = this.formBuilder.group({
      profile: this.formBuilder.group({
        company_name: [null, Validators.required],
        customer_name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        address: [null],
        contact_no: [''],
        salesforce_id: [''],
      }),
      subscription: this.formBuilder.group({
        company_id: ['', Validators.required],
        type: [this.subscriptionTypes[0].key, Validators.required],
        company_key: [null, Validators.required],
        tier: ['', Validators.required],
        package_info: this.formBuilder.group({
          quota_interval: this.createGroup(DefaultSelction),
          quota_limit: [1],
          rate_limit: this.createGroup(DefaultSelction),
          quota_permin: [1],
        }),
        exp_date_type: [this.expDates[0].key],
        expiry_date: [''],
      }),
      exclude_classifier: this.formBuilder.group({
        classifier_list: this.formBuilder.array([]),
      }),
    });
  }

  setTierDefaultSelection(tierId: any, type = 'community') {
    const isCustomPackage = this.customer && this.customer?.isCustomPackage;
    const id = this.customer?.packageInformation?.packageId;
    const subType = this.subType?.value || 'community';
    const filteredTiers = this.tiers.filter((el) => el.type === subType);

    let key = '';
    if (filteredTiers.length) {
      key = filteredTiers[0].id;
    } else key = this.CUSTOM_KEY;

    if (this.editMode) {
      if (
        id &&
        filteredTiers.some((el) => el.id === id) &&
        isCustomPackage !== 1
      ) {
        key = id;
      } else key = this.CUSTOM_KEY;
    }

    setTimeout(() => {
      this.subscriptionGroup?.patchValue({
        tier: key,
      });
    }, 0);
  }

  createTiers() {
    if (this.packages) {
      this.tiers = this.packages
        .filter((p: IPackageItem) => p.status === Active)
        .map((el: IPackageItem) => ({
          key: el.name.toLowerCase(),
          value: `${el.name} (Quota/${el.quotaType}: ${el.quotaLimit} | Quota/min: ${el.perMinLimit} Call(s)/min)`,
          type: el.type,
          id: el.id,
          enablexpdate: el.enablexpdate,
        }));
      if (!this.editMode) this.setTierDefaultSelection('', 'community');
      else
        this.setTierDefaultSelection(
          this.customer?.packageInformation?.id,
          this.subType?.value
        );
    }
    this.isTiersLoading = false;
  }

  setCustomerId() {
    this.companyNameSubscription = <Subscription>(
      this.newCompanyForm
        .get('profile.company_name')
        ?.valueChanges.subscribe((companyName) => {
          this.newCompanyForm.get('subscription')?.patchValue({
            company_id: `${COMPANY_PREFIX}${companyName.toUpperCase()}`,
          });
        })
    );
  }

  createGroup(item: IDropdown) {
    return this.formBuilder.group({
      ...item,
      name: [item.label],
    });
  }

  createGroupForCheckBox(item: IRadio, index: number) {
    return this.formBuilder.group({
      ...item,
      modelKey: false,
    });
  }

  resetPackInfoGroup() {
    this.newCompanyForm.get('subscription.package_info')?.patchValue({
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
      quota_permin: [1],
    });
  }

  monitorSubscriptionTypeChanges() {
    this.subTypeSubscription = <Subscription>(
      this.newCompanyForm
        .get('subscription.type')
        ?.valueChanges.subscribe((type) => {
          if (type === 'community') {
            this.newCompanyForm.get('subscription')?.patchValue({
              exp_date_type: this.expDates[0].key,
              expiry_date: '',
            });
          }
          // this.resetPackInfoGroup();
        })
    );
  }

  monitorTierChanges() {
    this.tierSubscription = <Subscription>(
      this.subscriptionGroup
        ?.get('tier')
        ?.valueChanges.subscribe((tierType) => {
          if (
            tierType !== this.CUSTOM_KEY &&
            this.subType?.value === 'community'
          ) {
            this.subscriptionGroup?.patchValue({
              exp_date_type: this.expDates[0].key,
            });
          }

          if (tierType === this.CUSTOM_KEY) {
            this.shouldEnableExpiryDate = true;
            this.quotaLimitControl?.setValidators([Validators.required]);
            this.quotaPerMinControl?.setValidators([Validators.required]);
          } else {
            const tier = this.tiers.find((el) => el.id === tierType);
            this.shouldEnableExpiryDate = !!tier?.enablexpdate;
            this.quotaLimitControl?.clearValidators();
            this.quotaPerMinControl?.clearValidators();
            // if (!this.tierControl?.pristine) this.resetPackInfoGroup();
          }
          this.quotaLimitControl?.updateValueAndValidity();
          this.quotaPerMinControl?.updateValueAndValidity();
        })
    );
  }

  monitorRateLimitChanges() {
    this.rateLimitSubscription = <Subscription>(
      this.subscriptionGroup
        ?.get('package_info.rate_limit')
        ?.valueChanges.subscribe((ratePerMin: any) => {
          if (ratePerMin.value === this.CUSTOM_KEY) {
            this.quotaPerMinControl?.setValidators([Validators.required]);
          } else {
            this.quotaPerMinControl?.clearValidators();
            this.attempts += 1;
            this.subscriptionGroup?.get('package_info')?.patchValue({
              quota_permin: this.customer?.packageInformation?.perMinLimit || 1,
            });
          }
          this.quotaPerMinControl?.updateValueAndValidity();
        })
    );
  }

  toggleExpiryDateValidation() {
    this.expirydateValidationSubscription = <Subscription>(
      this.newCompanyForm
        .get('subscription.exp_date_type')
        ?.valueChanges.subscribe((type) => {
          if (type === this.CUSTOM_KEY) {
            this.expiryDateControl?.setValidators([Validators.required]);
          } else {
            this.expiryDateControl?.clearValidators();
            this.subscriptionGroup?.patchValue({
              expiry_date: this.customer?.expiryDate,
            });
          }
          this.expiryDateControl?.updateValueAndValidity();
        })
    );
  }

  detectFormChanges() {
    this.setCustomerId();
    this.monitorSubscriptionTypeChanges();
    this.toggleExpiryDateValidation();
    this.monitorTierChanges();
    this.monitorRateLimitChanges();
  }

  isInvalidDate(d: any) {
    // Disable All previous dates
    return d.isBefore(moment().subtract(1, 'day'));
  }

  onExpiryDateChange(event: any) {
    // this.subscriptionGroup.patchValue({
    //   expiry_date: moment(event.endDate),
    // });
  }

  getLastSelection() {
    const { quota_interval = '', rate_limit = '' } =
      this.packageGroup?.value || {};
    this.lastSelection$.next({
      quota_interval,
      rate_limit,
    });
  }

  onAddNewCompany() {}

  // Step Change
  handleStepChange(step: StepModel) {
    this.activeStep = step;
  }

  onNextStep() {
    this.attempts += 1;
    const index = this.activeStep.stepIndex;
    this.activeStep.isComplete = true;
    if (index < this.steps.length) {
      this.activeStep = this.steps[index];
    }
    if (this.editMode && this.attempts > 1) this.getLastSelection();
  }

  onPreviousStep() {
    this.attempts += 1;
    const index = this.activeStep.stepIndex - 1;
    if (index > 0) {
      this.activeStep = this.steps[index - 1];
      this.activeStep.isComplete = false;
    }
    if (this.editMode && this.attempts > 1) this.getLastSelection();
  }

  onSave() {
    const payload = this.createPayload();
    if (this.editMode) {
      payload.id = this.customer?.id;
      this.customerService.updateCompany(payload).subscribe((d) => {
        const res = <SSOResponse>d;
        if (res.code !== ProjectStatusCode.ValidationFailed) {
          this.onClose();
        }
      });
    }
  }

  onClose() {
    this.isPanelOpen = false;
    if (this.editMode) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    }
  }

  createPayload() {
    const { packageInformation: { packageId: pkgId = 0 } = {} } =
      this.customer || {};
    const {
      profile: {
        company_name: companyName,
        customer_name: customerName,
        email: recipients,
        address,
        contact_no: contactNo,
        salesforce_id: salesforceId,
      },
      subscription: {
        company_id: custId,
        type: subscriptionType,
        company_key: key,
        expiry_date,
        exp_date_type,
        tier: packageId,
        package_info,
      },
      exclude_classifier: { classifier_list },
    } = this.newCompanyForm.value;

    let payload: any = {
      companyName,
      customerName,
      recipients,
      address,
      contactNo,
      salesforceId,
      custId,
      subscriptionType,
      key,
    };
    payload.expiryDate = this.customer?.expiryDate;
    payload.packageId = packageId === this.CUSTOM_KEY ? pkgId : packageId;
    if (packageId === this.CUSTOM_KEY) {
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

      payload = {
        ...payload,
        quotaLimit: Array.isArray(quotaLimit) ? +quotaLimit[0] : +quotaLimit,
        quotaType: QuotaType[quotaType],
        perMinLimit: Array.isArray(perMinLimit)
          ? +perMinLimit[0]
          : +perMinLimit,
        threshold: threashold,
      };
    }
    payload.isEditingPackage = packageId === this.CUSTOM_KEY ? 1 : 0;
    payload.custExculClassifiers = classifier_list
      .filter((el: any) => !!el.modelKey)
      .map((el: any) => el.value)
      .join(',');
    return payload;
  }

  // Controls
  get subscriptionGroup() {
    if (this.newCompanyForm) {
      return this.newCompanyForm.controls['subscription'] as FormGroup;
    }
    return null;
  }

  get expiryDateControl() {
    if (this.subscriptionGroup) {
      return this.subscriptionGroup.controls['expiry_date'] as FormControl;
    }
    return null;
  }

  get subType() {
    if (this.subscriptionGroup) {
      return this.subscriptionGroup.controls['type'] as FormControl;
    }
    return null;
  }

  get tierControl() {
    if (this.subscriptionGroup) {
      return this.subscriptionGroup.controls['tier'] as FormControl;
    }
    return null;
  }

  get packageGroup() {
    if (this.subscriptionGroup) {
      return this.subscriptionGroup.controls['package_info'] as FormGroup;
    }
    return null;
  }

  get quotaLimitControl() {
    if (this.subscriptionGroup) {
      return (this.subscriptionGroup.controls['package_info'] as FormGroup)
        .controls['quota_limit'] as FormControl;
    }
    return null;
  }

  get rateControl() {
    if (this.subscriptionGroup) {
      return (this.subscriptionGroup.controls['package_info'] as FormGroup)
        .controls['rate_limit'] as FormControl;
    }
    return null;
  }

  get quotaPerMinControl() {
    if (this.subscriptionGroup) {
      return (this.subscriptionGroup.controls['package_info'] as FormGroup)
        .controls['quota_permin'] as FormControl;
    }
    return null;
  }

  get classifiersListArray() {
    return (this.newCompanyForm.get('exclude_classifier') as FormGroup)
      .controls['classifier_list'] as FormArray;
  }
}

// {
//   startDate: moment('2020-10-02'),
//   endDate: moment('2020-10-02'),
// },

// this.editMode && this.attempts === 1
// ? this.customer?.packageInformation?.perMinLimit
// : '',
