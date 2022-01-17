import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanelService } from '@shared/app-panel/app-panel.service';
import { StepsService } from '@shared/app-wizard/app-wizard-data.service';
import { Action, StepModel } from '@shared/app-wizard/interfaces/wizard';
import { DataStorageService } from '@shared/services/data-storage.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-oti-provisiong-customers',
  templateUrl: './customers.component.html',
})
export class OtiProvisioningCustomersComponent implements OnInit, OnDestroy {
  newCompanyForm!: FormGroup;

  _profileSubscription!: Subscription;
  _companySubscription!: Subscription;
  _excludeClassifierSubscription!: Subscription;

  currentStep!: StepModel;
  steps!: StepModel[];
  currentAction!: Observable<string>;
  showPanel!: Observable<boolean>;
  config = {
    icon: 'assets/svg/add-button-icon.svg',
    btnTitle: 'Add New Company Profile',
    classes: 'button-primary',
  };

  newCompanyProfileData!: string[];

  subscriptionTypes: Array<any> = [
    { key: 'community', value: 'Community Edition' },
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
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService,
    private stepsService: StepsService,
    private panelService: PanelService
  ) {}

  ngOnDestroy(): void {
    this._profileSubscription.unsubscribe();
    this._excludeClassifierSubscription.unsubscribe();
    this._companySubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.newCompanyProfileData =
      this.dataStorageService.getOtiProvisioningNewCompanySteps();

    this.currentAction = this.panelService.getCurrentAction();
    this.showPanel = this.panelService.getShowNav();

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
          this.classifierList.map((e) => false), Validators.required
        ),
      }),
    });

    this.stepsService.getCurrentStep().subscribe((cStep) => {
      this.currentStep = cStep;
      this.renderFooterButtons(this.currentStep.stepIndex);
    });

    this.stepsService.getSteps().subscribe((steps) => {
      this.steps = steps;
    });

    this.currentAction.subscribe((type) => {
      this.invokeAction(type);
    });

    this.onProfileComplete();
    this.onSubscriptionComplete();
    this.onClassifierComplete();
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
      console.log(this.newCompanyForm.value);
    } else {
      this.onAddNewCompany();
    }
  }

  onBackStep() {
    this.stepsService.moveToBackStep();
  }

  onAddNewCompany() {
    this.panelService.setShowPanel(true);
  }

  invokeAction(type: string) {
    if (type === Action.Next) {
      this.currentStep.isComplete = true;
      this.onNextStep();
    } else if (type === Action.Back) {
      this.onBackStep();
      this.stepsService.getSteps().subscribe((steps) => {
        steps.forEach((s) => (s.isComplete = false));
      });
    } else if (type === Action.Save) {
      console.log(this.newCompanyForm.value);
    }
  }

  onProfileComplete() {
    this._profileSubscription = this.newCompanyForm.controls[
      'profile'
    ].statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.panelService.setCurrentActionState({
          next: { state: true, disable: false },
        });
      } else if (status == 'INVALID') {
        this.panelService.setCurrentActionState({
          next: { state: true, disable: true },
        });
      }
    });
  }

  onSubscriptionComplete() {
    this._companySubscription = this.newCompanyForm.controls[
      'subscription'
    ].statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.panelService.setCurrentActionState({
          next: { state: true, disable: false },
          back: { state: true, disable: false },
        });
      } else if (status == 'INVALID') {
        this.panelService.setCurrentActionState({
          next: { state: true, disable: true },
          back: { state: true, disable: false },
        });
      }
    });
  }

  onClassifierComplete() {
    this._excludeClassifierSubscription = this.newCompanyForm.controls[
      'exclude_classifier'
    ].statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.panelService.setCurrentActionState({
          save: { state: true, disable: false },
          back: { state: true, disable: false },
        });
      } else if (status == 'INVALID') {
        this.panelService.setCurrentActionState({
          save: { state: true, disable: true },
          back: { state: true, disable: false },
        });
      }
    });
  }

  renderFooterButtons(index: number) {
    console.log(index);
    if (index === 1) {
      this.panelService.setCurrentActionState({
        next: {
          state: true,
          disable: this.newCompanyForm.controls['profile'].invalid,
        },
      });
    }
    if (index > 1) {
      this.panelService.setCurrentActionState({
        back: { state: true },
        next: {
          state: true,
          disable: this.newCompanyForm.controls['subscription'].invalid,
        },
      });
    }
    if (index === 3) {
      this.panelService.setCurrentActionState({
        back: { state: true },
        save: { state: true, disable: this.newCompanyForm.controls['exclude_classifier'].invalid },
      });
    }
  }
}
