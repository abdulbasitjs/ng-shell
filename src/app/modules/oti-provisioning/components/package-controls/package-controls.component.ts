import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormControl } from '@angular/forms';
import {
  UIMESSAGES,
  IDropdown,
  QuotaInterval,
  RateLimitOptions,
} from '@configs/index';
import { CustomerService } from '../../services/customer.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '@core/services/loader.service';

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
  rateLimitPerMinSelectedIndex = 0;
  quotaIntervalSelectedIndex = 0;

  _lastSlections: { quota_interval: any; rate_limit: any; index: number } = {
    quota_interval: '',
    rate_limit: '',
    index: 0,
  };
  @Input() direction!: string;
  @Input() isLoading!: boolean | null;

  @Input() set lastSlections(selection: {
    quota_interval: any;
    rate_limit: any;
    index: number;
  }) {
    this._lastSlections = selection;
    if (selection) {
      this.rateLimitPerMinSelectedIndex = selection.rate_limit.index;
    }
    this.reset();
    this.generateRateLimit(this.rateLimitPerMinSelectedIndex);
    this.initialize();
  }

  DEFAULT = 'default';
  CUSTOM_KEY = 'custom';
  rlMinSubscription!: Subscription;
  quotaIntervals: IDropdown[] = QuotaInterval;
  rateLimitPerMinList: IDropdown[] = RateLimitOptions;
  UIMSG = UIMESSAGES;
  isIntialized = false;

  constructor(
    public controlContainer: ControlContainer,
    public customerService: CustomerService,
    public loaderService: LoaderService
  ) {}

  ngOnDestroy(): void {
    this.isIntialized = false;
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

  ngOnInit(): void {}

  resetQuotaInterval() {
    let val = this._lastSlections.quota_interval.value;
    let idx = this.quotaIntervals.findIndex((el) => el.value === val);
    idx = idx === -1 ? 0 : idx;
    this.quotaIntervals = this.quotaIntervals.map((el, i) => {
      return i === idx ? { ...el, active: true } : { ...el, active: false };
    });
    this.setSelectionItem(this.quotaIntervals[idx], 'quota_interval');
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
    this.resetQuotaInterval();
  }

  setSelectionItem(item: IDropdown, controlName: string) {
    if (item && item.label) {
      this.controls.patchValue({
        [controlName]: { ...item, name: item.label },
      });
    }
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
    this.generateRateLimit(this.rateLimitPerMinSelectedIndex);
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
      activeIndex
    );
    this.rateLimitPerMinSelectedIndex = activeIndex ? activeIndex : 0;
  }

  changeValueHandler(limit: number) {
    this.generateRateLimit(this.rateLimitPerMinSelectedIndex);
  }
}
