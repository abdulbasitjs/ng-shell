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
      })
    });

    this.quotaIntervalList[0].active = true;

    this.http.get(EP.Packages).subscribe((packages) => {
      this.packages = packages;
    });

  }


  // getApiQuotaControlValue(i: number) {
  //   const controls = (this.newPackageForm.get('api_points.apiQuotaList') as FormArray).controls;
  //   return controls[i].value;
  // }

  onAddNewPackage() {}

  handleStepChange(step: StepModel) {
    this.activeStep = step;
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
