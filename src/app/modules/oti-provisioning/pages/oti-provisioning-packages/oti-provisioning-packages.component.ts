import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  isPanelOpen: boolean = false;
  activeStep!: StepModel;
  packages!: any;

  newPackageForm!: FormGroup;

  apisQuota: Array<any> = [
    { id: 0, key: 'urlreputation', value: 1000 },
    { id: 1, key: 'scan', value: 1100 },
    { id: 2, key: 'scansync', value: 1200 },
    { id: 3, key: 'urlscreenshot', value: 13000 },
    { id: 4, key: 'urlhtml', value: 14000 },
    { id: 5, key: 'urltxt', value: 15000 },
    { id: 6, key: 'hostreputation', value: 16000 },
    { id: 7, key: 'hostreport', value: 17000 },
    { id: 8, key: 'quotastatus', value: 1800 },
    { id: 9, key: 'scanwithid', value: 2000 },
    { id: 10, key: 'scanasyncwithid', value: 2100 },
    { id: 10, key: 'scanasyncwithid', value: 2100 },
    { id: 10, key: 'scanasyncwithid', value: 2100 },
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
        quota_limit: [2000, Validators.required],
        rate_permin: [2000, Validators.required],
      }),
      api_points: this.formBuilder.group({
        apiQuotaList: this.formBuilder.array(this.apisQuota.map(el => el.value))
      }),
    });

    this.quotaIntervalList[0].active = true;

    this.http.get(EP.Packages).subscribe((packages) => {
      this.packages = packages;
    });

  }


  getApiQuotaControlValue(i: number) {
    const controls = (this.newPackageForm.get('api_points.apiQuotaList') as FormArray).controls;
    return controls[i].value;
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
