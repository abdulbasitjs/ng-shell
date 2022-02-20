import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup } from '@angular/forms';
import {
  UIMESSAGES,
  IDropdown,
  QuotaInterval,
  RateLimitOptions,
} from '@configs/index';

// Per month aprroximately result
// Avg( 31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30 + 31 ) = 30.416666666666668
// 1440 * 30.416666666666668 = 43800 minutes in month

const minuteInInterval: any = {
  daily: 1440,
  weekly: 1440 * 7,
  monthly: 43800,
  yearly: 43800 * 12,
};

@Component({
  selector: 'app-package-controls',
  templateUrl: './package-controls.component.html',
})
export class AppPackageControlsComponent implements OnInit {
  _quotaLimit = 0;
  quotaIntervals: IDropdown[] = QuotaInterval;
  rateLimitPerMinList: IDropdown[] = RateLimitOptions;
  UIMSG = UIMESSAGES;

  constructor(public controlContainer: ControlContainer) {}

  get controls() {
    return this.controlContainer.control as FormGroup;
  }

  get quotaIntervalControl() {
    return this.controls.controls['quota_interval'].value as FormGroup;
  }

  get rateControl() {
    return this.controls.controls['rate_limit'].value as FormGroup;
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.quotaIntervals[0].active = true;
    this.rateLimitPerMinList[0].active = true;
    this.setSelectionItem(this.quotaIntervals[0], 'quota_interval');
    this.setSelectionItem(this.rateLimitPerMinList[0], 'rate_limit');
  }

  setSelectionItem(item: IDropdown, controlName: string) {
    this.controls.patchValue({
      [controlName]: { ...item, name: item.label },
    });
  }

  handleQuotaIntervalSelect(item: IDropdown) {
    this.setSelectionItem(item, 'quota_interval');
  }

  handleRatesLimitSelect(item: IDropdown) {
    this.setSelectionItem(item, 'rate_limit');
  }

  generateRateLimit() {
    const originalRate =
      this._quotaLimit / minuteInInterval[this.quotaIntervalControl.value];
    // const ratePerMin = Math.ceil(originalRate);
    const defaultSelection = {
      label: 'Select Rate Limit / Min',
      value: 'default',
      active: true,
    };
    const customSelection = { label: 'Custom', value: 'custom', active: false };
    const ratePerminList = [];
    for (let i = 1; i <= 10; i++) {
      ratePerminList.push({
        value: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        label: `${Math.ceil(originalRate * i)} Calls / Min (${i}x)`,
        active: false,
      });
    }

    this.rateLimitPerMinList.length = 0;
    this.rateLimitPerMinList.push(defaultSelection, ...ratePerminList, customSelection);
  }

  changeValueHandler(limit: number) {
    this._quotaLimit = limit;
    this.generateRateLimit();
  }
}
