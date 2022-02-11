import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { quotaInterval } from '@configs/ui.config';
import { UIMESSAGES } from '@configs/ui.messages';
import { rateLimitOptions } from '../../../../configs/ui.config';

@Component({
  selector: 'app-package-add-edit',
  templateUrl: './package-add-edit.component.html',
})
export class AppPackageAddEditComponent implements OnInit {
  UIMSG = UIMESSAGES;
  quotaIntervalList = quotaInterval;
  rateLimitPerMinList = rateLimitOptions;

  isPanelOpen: boolean = true;
  newPackageForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newPackageForm = this.formBuilder.group({
      package_info: this.formBuilder.group({
        package_name: [null, Validators.required],
        quota_interval: [this.quotaIntervalList[0].label, Validators.required],
        quota_limit: [1, Validators.required],
        rate_limit: [this.rateLimitPerMinList[0].label, Validators.required],
      }),
    });
    this.quotaIntervalList[0].active = true;
  }

  onAddNewPackage() {}

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

  onSave() {
    console.log(this.newPackageForm.value);
    this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  generateRateLimit() {}
}
