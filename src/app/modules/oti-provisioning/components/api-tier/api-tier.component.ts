import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-api-tier',
  templateUrl: './api-tier.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ApiTierComponent),
    },
  ],
})
export class ApiTierComponent implements OnInit, ControlValueAccessor {
  _tiers!: Array<any>;
  _fitlerTiers!: Array<any>;
  _subType!: string;
  _isIntitalLoad!: boolean;
  @Input() loading!: boolean;
  @Input() customValueLabel: string = 'Custom';

  @Input() set subType(type: string) {
    this._subType = type;
    this._isIntitalLoad = false;
    this.generateTiers();
  }

  @Input() set tiers(collection: any) {
    this._tiers = collection;
    this.generateTiers();
  }

  activeTier!: any;

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  constructor() {}

  writeValue(obj: any): void {
    this.activeTier = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit(): void {
    this._isIntitalLoad = true;
  }

  onTierChange(tier: any) {
    this.activeTier = tier.key;
    this.onChange(tier.key);
  }

  reset() {
    this._fitlerTiers = [
      ...this._tiers.filter((el) => el.type === this._subType),
      { key: 'custom', value: this.customValueLabel },
    ];

    if (!this._isIntitalLoad) this.activeTier = this._fitlerTiers[0].key;
    else this.activeTier = this.activeTier || this._fitlerTiers[0].key;
  }

  generateTiers() {
    if (this._tiers) {
      this.reset();
    }
    this.onChange(this.activeTier);
  }
}
