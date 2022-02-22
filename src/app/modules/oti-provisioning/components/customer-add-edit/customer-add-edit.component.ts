import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';
import { CustomerService } from '../../services/customer.service';
import { PackageService } from '../../services/package.service';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import {
  ExpDates,
  SubscriptionTypes,
  ClassifierList,
  IDropdown,
} from '@configs/index';

const Active = 'Active';
const DefaultSelction = {
  label: '',
  value: 'default',
  active: false,
};
const COMPANY_PREFIX = 'SNXCUST-';
const TIER_CUSTOM_KEY = 'custom';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
})
export class AppCustomerAddEditComponent implements OnInit, OnDestroy {
  DEFAULT_LABEL = 'Select Rate Limit / Min';
  subscriptionTypes = SubscriptionTypes;
  expDates = ExpDates;
  classifierList = ClassifierList;

  steps!: StepModel[];
  isPanelOpen: boolean = true;
  activeStep!: StepModel;

  packagesSubscription!: Subscription;
  customerKeySubscription!: Subscription;
  subTypeSubscription!: Subscription;
  companyNameSubscription!: Subscription;
  expirydateValidationSubscription!: Subscription;
  tierSubscription!: Subscription;

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
  }

  ngOnInit(): void {
    this.steps = this.customerService.getAddNewCompanySteps();
    this.activeStep = this.steps[0];
    this.getPackges();
    this.populateCompanyForm();
    this.fetchCustomerKey();
    this.detectFormChanges();
  }

  fetchCustomerKey() {
    this.customerKeySubscription = this.customerService
      .getCustomerKey()
      .subscribe((key) => {
        this.newCompanyForm.get('subscription')?.patchValue({
          company_key: key,
        });
      });
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

  setTierDefaultSelection() {
    const filteredTiers = this.tiers.filter(
      (el) => el.type === this.subType.value
    );
    let key = '';
    if (filteredTiers.length) {
      key = filteredTiers[0].key;
    } else key = TIER_CUSTOM_KEY;

    this.subscriptionGroup.patchValue({
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

  get subscriptionGroup() {
    return this.newCompanyForm.controls['subscription'] as FormGroup;
  }

  get expiryDateControl() {
    return this.subscriptionGroup.controls['expiry_date'] as FormControl;
  }

  get subType() {
    return this.subscriptionGroup.controls['type'] as FormControl;
  }

  get tierControl() {
    return this.subscriptionGroup.controls['tier'] as FormControl;
  }

  get quotaLimitControl() {
    return (this.subscriptionGroup.controls['package_info'] as FormGroup)
      .controls['quota_limit'] as FormControl;
  }

  get rateControl() {
    return (this.subscriptionGroup.controls['package_info'] as FormGroup)
      .controls['rate_limit'] as FormControl;
  }

  get quotaPerMinControl() {
    return (this.subscriptionGroup.controls['package_info'] as FormGroup)
    .controls['quota_permin'] as FormControl;
  }

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
        classifier_list: this.formBuilder.array(
          this.classifierList.map((e) => false),
          Validators.required
        ),
      }),
    });
  }

  createGroup(item: IDropdown) {
    return this.formBuilder.group({
      ...item,
      ...{
        name: [item.label],
      },
    });
  }

  detectFormChanges() {
    this.companyNameSubscription = <Subscription>(
      this.newCompanyForm
        .get('profile.company_name')
        ?.valueChanges.subscribe((companyName) => {
          this.newCompanyForm.get('subscription')?.patchValue({
            company_id: `${COMPANY_PREFIX}${companyName.toUpperCase()}`,
          });
        })
    );

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
        })
    );

    this.expirydateValidationSubscription = <Subscription>(
      this.newCompanyForm
        .get('subscription.exp_date_type')
        ?.valueChanges.subscribe((type) => {
          if (type === 'custom') {
            this.expiryDateControl.setValidators([Validators.required]);
          } else {
            this.expiryDateControl.clearValidators();
            this.subscriptionGroup.patchValue({
              expiry_date: '',
            });
          }
          this.expiryDateControl.updateValueAndValidity();
        })
    );

    this.tierSubscription = <Subscription>(
      this.subscriptionGroup.get('tier')?.valueChanges.subscribe((tierType) => {
        if (tierType !== 'custom' && this.subType.value === 'community') {
          this.subscriptionGroup.patchValue({
            exp_date_type: this.expDates[0].key,
          });
        }

        if (tierType === 'custom') {
          this.quotaLimitControl.setValidators([Validators.required]);
        } else {
          this.quotaLimitControl.clearValidators();
          this.subscriptionGroup.get('package_info')?.patchValue({
            quota_limit: 1
          })
        }
        this.quotaLimitControl.updateValueAndValidity();
      })
    );

    this.subscriptionGroup.get('package_info.rate_limit')?.valueChanges.subscribe(ratePerMin => {
      if (ratePerMin.value === 'custom') {
        this.quotaPerMinControl.setValidators([Validators.required]);
      } else {
        this.quotaPerMinControl.clearValidators();
        this.subscriptionGroup.get('package_info')?.patchValue({
          quota_permin: ''
        })
      }
      this.quotaPerMinControl.updateValueAndValidity();
    })

  }

  isInvalidDate(d: any) {
    return d.isBefore(moment().subtract(1, 'day'))
  }

  onExpiryDateChange(event: any) {
    // this.subscriptionGroup.patchValue({
    //   expiry_date: moment(event.endDate),
    // });
  }

  onAddNewCompany() {}

  handleStepChange(step: StepModel) {
    this.activeStep = step;
  }

  regeneRateKey(event: Event) {
    event.preventDefault();
    this.fetchCustomerKey();
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
}

// {
//   startDate: moment('2020-10-02'),
//   endDate: moment('2020-10-02'),
// },
