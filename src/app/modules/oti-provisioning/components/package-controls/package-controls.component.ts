import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  UIMESSAGES,
  IDropdown,
  QuotaInterval,
  RateLimitOptions,
} from '@configs/index';
import { CustomerService } from '../../services/customer.service';
import { Subscription } from 'rxjs';

const minuteInInterval: any = {
  daily: 1440,
  weekly: 1440 * 7,
  monthly: 1440 * 30,
  yearly: 1440 * 365,
};

const DEFAULT_LABEL = 'Select Rate Limit / Min';

@Component({
  selector: 'app-package-controls',
  templateUrl: './package-controls.component.html',
})
export class AppPackageControlsComponent implements OnInit, OnDestroy {
  DEFAULT = 'default';
  CUSTOM_KEY = 'custom';
  rlMinSubscription!: Subscription;
  quotaIntervals: IDropdown[] = QuotaInterval;
  rateLimitPerMinList: IDropdown[] = RateLimitOptions;
  UIMSG = UIMESSAGES;
  quotaIntervalSelectedIndex = 0;
  rateLimitPerMinSelectedIndex = 0;

  constructor(
    public controlContainer: ControlContainer,
    public customerService: CustomerService
  ) {}

  ngOnDestroy(): void {
    if (this.rlMinSubscription) this.rlMinSubscription.unsubscribe();
  }

  get controls() {
    return this.controlContainer.control as FormGroup;
  }

  get quotaIntervalControl() {
    return this.controls.controls['quota_interval'].value as FormGroup;
  }

  get quotaLimit() {
    return this.controls.controls['quota_limit'] as FormControl;
  }

  get rateControl() {
    return this.controls.controls['rate_limit'] as FormGroup;
  }

  ngOnInit(): void {
    this.reset();
    this.generateRateLimit();
    this.initialize();
  }

  initialize() {
    this.rlMinSubscription = this.customerService
      .getRatePerLimitMinListObservable()
      .subscribe((rlMin) => {
        this.rateLimitPerMinList = rlMin;
        this.setSelectionItem(
          this.rateLimitPerMinList[this.rateLimitPerMinSelectedIndex],
          'rate_limit'
        );
      });
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

  checkValidation(key: string) {
    if (key === DEFAULT_LABEL) {
      this.rateControl.controls['name'].setErrors({ incorrect: true });
    } else {
      this.rateControl.controls['name'].setErrors(null);
    }
  }

  handleQuotaIntervalSelect(item: IDropdown) {
    this.quotaIntervalSelectedIndex = this.quotaIntervals.findIndex(
      (el) => el.value === item.value
    );
    this.setSelectionItem(item, 'quota_interval');
    this.generateRateLimit();
  }

  handleRatesLimitSelect(item: IDropdown) {
    this.rateLimitPerMinSelectedIndex = this.rateLimitPerMinList.findIndex(
      (el) => el.value === item.value
    );
    this.setSelectionItem(item, 'rate_limit');
  }

  generateRateLimit(activeIndex?: number) {
    this.customerService.generateRatePerMinList(
      this.quotaLimit.value || 1,
      minuteInInterval[this.quotaIntervalControl.value],
      activeIndex || this.rateLimitPerMinSelectedIndex
    );
  }

  changeValueHandler(limit: number) {
    this.generateRateLimit();
  }
}
