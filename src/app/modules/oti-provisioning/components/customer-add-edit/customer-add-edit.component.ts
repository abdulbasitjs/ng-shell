import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '@core/services/data-storage.service';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';

@Component({
  selector: 'app-customer-add-edit',
  templateUrl: './customer-add-edit.component.html',
})
export class AppCustomerAddEditComponent implements OnInit {
  steps!: StepModel[];
  isPanelOpen: boolean = true;
  activeStep!: StepModel;

  newCompanyForm!: FormGroup;
  subscriptionTypes: Array<any> = [
    { key: 'community', value: 'Community Editionnnn' },
    { key: 'enterprise', value: 'Enterprise Edition' },
  ];

  tiers: Array<any> = [
    {
      key: 'default',
      value: 'Default (Quota/day: 250 | Quota/min: 2 Call(s)/min)',
    },
    { key: 'custom', value: 'Custom' },
  ];

  expDates: Array<any> = [
    { key: 'never', value: 'Never' },
    { key: 'custom', value: 'Custom' },
  ];

  classifierList: Array<any> = [
    { key: 'cs', value: 'cs' },
    { key: 'csvc', value: 'csvc' },
    { key: 'rw', value: 'rw' },
    { key: 'sw', value: 'sw' },
    { key: 'nlp', value: 'nlp' },
    { key: 'scam', value: 'scam' },
    { key: 'handler', value: 'handler' },
    { key: 'gsb', value: 'gsb' },
    { key: 'annotator', value: 'annotator' },
  ];

  constructor(
    private dataStorageService: DataStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.steps = this.dataStorageService.getOtiProvisioningNewCompanySteps();
    this.activeStep = this.steps[0];

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
        tier: [this.tiers[0].key, Validators.required],
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

  onAddNewCompany() {}

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
    this.isPanelOpen = false;
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
