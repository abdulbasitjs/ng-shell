import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES, QuotaInterval, RateLimitOptions } from '@configs/index';
@Component({
  selector: 'app-package-add-edit',
  templateUrl: './package-add-edit.component.html',
})
export class AppPackageAddEditComponent implements OnInit {
  UIMSG = UIMESSAGES;
  quotaIntervalList = QuotaInterval;
  rateLimitPerMinList = RateLimitOptions;

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
