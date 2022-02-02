import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-range-btn',
  templateUrl: './range-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ButtonRangeComponent),
    },
  ],
})
export class ButtonRangeComponent implements OnInit, ControlValueAccessor {
  constructor() {}
  inputValue = 0;

  onChange = (_: any) => {};
  onTouch = (_: any) => {};

  writeValue(value: any): void {
   this.inputValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(state: any) {
  }

  ngOnInit(): void {}

  increment() {
    this.inputValue += 1;
    this.onChange(this.inputValue);
  }

  decrement() {
    this.inputValue -= 1;
    this.onChange(this.inputValue);
  }
}