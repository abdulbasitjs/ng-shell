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
import { Subscription, map } from 'rxjs';
import * as moment from 'moment';

import { ExpDates, SubscriptionTypes, IDropdown, IRadio } from '@configs/index';

const Active = 'Active';
const DefaultSelction = {
  label: '',
  value: 'custom',
  active: false,
};
const COMPANY_PREFIX = 'SNXCUST-';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
})
export class AppCustomerAddEditComponent implements OnInit, OnDestroy {
  CUSTOM_KEY = 'custom';
  DEFAULT_LABEL = 'Select Rate Limit / Min';
  subscriptionTypes = SubscriptionTypes;
  expDates = ExpDates;
  classifierList = [{ key: '', value: '' }];

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

  packages!: [];
  tiers = [{ key: '', value: '', type: '' }];
  expiryDateFormat = {
    format: 'YYYY-MM-DD',
    displayFormat: 'YYYY-MM-DD',
  };
  isTiersLoading = false;

  newCompanyForm!: FormGroup;

  constructor(
    public customerService: CustomerService,
    public packageService: PackageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
  }

  ngOnInit(): void {
    this.steps = this.customerService.getAddNewCompanySteps();
    this.activeStep = this.steps[0];
    this.getPackges();
    this.populateCompanyForm();
    this.fetchCustomerKey();
    this.detectFormChanges();
    this.getClassifiers();
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
    this.packageService.getPackages();
    this.packagesSubscription = this.packageService
      .getPackagesObservable()
      .subscribe((packages) => {
        this.packages = packages;
        this.createTiers();
      });
  }

  getClassifiers() {
    this.customerService.getClassifierList();
    this.customerService.getClassifiersObservable().subscribe((list) => {
      this.classifierList = list;
      list.map((el: any, i: number) => {
        this.classifiersListArray.push(this.createGroupForCheckBox(el, i));
      });
    });
  }

  // Form Helpers

  populateCompanyForm() {
    this.newCompanyForm = this.formBuilder.group({
      profile: this.formBuilder.group({
        company_name: [null, Validators.required],
        customer_name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        address: [null],
        contact_no: [null],
        salesforce_id: [null],
      }),
      subscription: this.formBuilder.group({
        company_id: ['', Validators.required],
        type: [this.subscriptionTypes[0].key, Validators.required],
        company_key: [null, Validators.required],
        tier: ['', Validators.required],
        package_info: this.formBuilder.group({
          quota_interval: this.createGroup(DefaultSelction),
          quota_limit: [1440],
          rate_limit: this.createGroup(DefaultSelction),
          quota_permin: [''],
        }),
        exp_date_type: [this.expDates[0].key],
        expiry_date: [''],
      }),
      exclude_classifier: this.formBuilder.group({
        classifier_list: this.formBuilder.array([]),
      }),
    });
  }

  setTierDefaultSelection() {
    const filteredTiers = this.tiers.filter(
      (el) => el.type === this.subType?.value
    );
    let key = '';
    if (filteredTiers.length) {
      key = filteredTiers[0].key;
    } else key = this.CUSTOM_KEY;

    this.subscriptionGroup?.patchValue({
      tier: key,
    });
  }

  createTiers() {
    if (this.packages) {
      this.tiers = this.packages
        .filter((p: any) => p.status === Active)
        .map((el: any) => ({
          key: el.package_name.toLowerCase(),
          value: `${el.package_name} (Quota/day: 250 | Quota/min: 2 Call(s)/min)`,
          type: el.type,
        }));
      this.setTierDefaultSelection();
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
      modelKey: index === 5,
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
      quota_permin: [''],
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
            this.quotaLimitControl?.setValidators([Validators.required]);
          } else {
            this.quotaLimitControl?.clearValidators();
            if (!this.tierControl?.pristine) this.resetPackInfoGroup();
          }
          this.quotaLimitControl?.updateValueAndValidity();
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
            this.subscriptionGroup?.get('package_info')?.patchValue({
              quota_permin: '',
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
              expiry_date: '',
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
    const { quota_interval, rate_limit } =
      this.newCompanyForm.value.subscription.package_info;
    return {
      quota_interval,
      rate_limit,
    };
  }

  onAddNewCompany() {}

  // Step Change
  handleStepChange(step: StepModel) {
    this.activeStep = step;
  }

  onNextStep() {
    const index = this.activeStep.stepIndex;
    this.activeStep.isComplete = true;
    if (index < this.steps.length) {
      this.activeStep = this.steps[index];
    }
  }

  onPreviousStep() {
    const index = this.activeStep.stepIndex - 1;
    if (index > 0) {
      this.activeStep = this.steps[index - 1];
      this.activeStep.isComplete = false;
    }
  }

  onSave() {
    console.log(this.newCompanyForm.value);
    // this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../'], { relativeTo: this.route });
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
