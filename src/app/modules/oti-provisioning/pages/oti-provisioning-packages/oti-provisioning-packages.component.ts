import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EP } from '@configs/endpoints';
import { DataStorageService } from '@core/services/data-storage.service';
import {
  DataTable,
  Row,
} from '@shared/components/app-data-table/interfaces/datatable';
import { StepModel } from '@shared/components/app-wizard/interfaces/wizard';
import { Router, ActivatedRoute } from '@angular/router';
import { quotaInterval } from '../../../../configs/ui.config';

@Component({
  selector: 'app-oti-provisioning-customers',
  templateUrl: './oti-provisioning-packages.component.html',
})
export class OtiProvisioningPackagesComponent implements OnInit {
  quotaIntervalList = quotaInterval;
  packagesDatatable!: DataTable;
  steps!: StepModel[];
  isPanelOpen: boolean = true;
  activeStep!: StepModel;

  packages!: any;

  newPackageForm!: FormGroup;
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
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.packagesDatatable =
      this.dataStorageService.getOtiProvisioningPackagesTableConfig();
    this.steps = this.dataStorageService.getOtiProvisioningNewPackageSteps();
    this.activeStep = this.steps[0];

    this.newPackageForm = this.formBuilder.group({
      package_info: this.formBuilder.group({
        package_name: [null, Validators.required],
        quota_interval: [this.quotaIntervalList[0].label, Validators.required],
        quota_limit: [null, Validators.required],
        rate_permin: [null, Validators.required],
      }),
      api_points: this.formBuilder.group({
        reputation: [null, Validators.required],
      }),
    });

    this.quotaIntervalList[0].active = true;

    this.http.get(EP.Packages).subscribe((packages) => {
      this.packages = packages;
    });
  }

  onAddNewPackage() {}

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
    console.log(this.newPackageForm.value);
    this.isPanelOpen = false;
  }

  handleHeaderClick([sortBy, order]: Array<any>) {
    this.http
      .get(`${EP.Packages}?_sort=${sortBy}&_order=${order}`)
      .subscribe((packages) => {
        this.packages = packages;
      });
  }

  handleRow(row: Row) {
    this.router.navigate(['./' + row['id']], { relativeTo: this.route });
  }

  handleQuotaIntervalSelect(item: any) {
    this.quotaIntervalList = this.quotaIntervalList.map((el) => {
      return {
        ...el,
        active: el.value === item.value,
      };
    });

    this.newPackageForm.controls['package_info'].patchValue({
      quota_interval: item.label,
    });
  }
}
