import {
  Directive,
  HostListener,
  Inject,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { interval, Subscription, take } from 'rxjs';

@Directive({
  selector: '[appThemeChanger]',
})
export class AppThemeChangerDirective {
  constructor(
    @Inject(DOCUMENT) private _document: any,
    private rendere: Renderer2
  ) {}

  @HostListener('change', ['$event'])
  onChange(event: any) {
    if (event.target.checked) {
      this.applyTransition();
      this.rendere.setAttribute(this._document.documentElement, 'data-theme', 'dark');
    } else {
      this.applyTransition();
      this.rendere.setAttribute(this._document.documentElement, 'data-theme', 'light');
    }
  }

  applyTransition() {
    this.rendere.addClass(this._document.documentElement, 'transition');
    interval(1000).pipe(take(1)).subscribe(() => {
      this.rendere.removeClass(this._document.documentElement, 'transition');
    })
  }
}
