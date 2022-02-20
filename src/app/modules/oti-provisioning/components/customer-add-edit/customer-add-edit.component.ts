import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';
import { CustomerService } from '../../services/customer.service';
import { PackageService } from '../../services/package.service';
import { Subscription } from 'rxjs';
import {
  ExpDates,
  QuotaInterval,
  RateLimitOptions,
  SubscriptionTypes,
  ClassifierList,
  IDropdown,
} from '@configs/index';

const Active = 'Active';
const DefaultSelction = {
  label: '',
  value: '',
  active: false,
};
@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
})
export class AppCustomerAddEditComponent implements OnInit, OnDestroy {
  subscriptionTypes = SubscriptionTypes;
  expDates = ExpDates;
  classifierList = ClassifierList;

  steps!: StepModel[];
  isPanelOpen: boolean = true;
  activeStep!: StepModel;
  packagesSubscription!: Subscription;
  customerKeySubscription!: Subscription;
  packages!: [];
  tiers = [{ key: '', value: '' }];

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
  }

  ngOnInit(): void {
    this.steps = this.customerService.getAddNewCompanySteps();
    this.activeStep = this.steps[1];
    this.getPackges();
    this.populateCompanyForm();
    this.fetchCustomerKey();
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
    this.packageService.getPackages();
    this.packagesSubscription = this.packageService
      .getPackagesObservable()
      .subscribe((packages) => {
        this.packages = packages;
        this.createTiers();
      });
  }

  createTiers() {
    if (this.packages) {
      this.tiers = this.packages
        .filter((p: any) => p.status === Active)
        .map((el: any) => ({
          key: el.package_name.toLowerCase(),
          value: `${el.package_name} (Quota/day: 250 | Quota/min: 2 Call(s)/min)`,
        }));
    }
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
        company_id: ['SNXCUST-ABC', Validators.required],
        type: [this.subscriptionTypes[0].key, Validators.required],
        company_key: [null, Validators.required],
        tier: ['', Validators.required],
        package_info: this.formBuilder.group({
          quota_interval: this.createGroup(DefaultSelction),
          quota_limit: [1, Validators.required],
          rate_limit: this.createGroup(DefaultSelction),
          quota_permin: ['', Validators.required],
        }),
        exp_date: [this.expDates[0].key, Validators.required],
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
        name: [item.label, Validators.required],
      },
    });
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
