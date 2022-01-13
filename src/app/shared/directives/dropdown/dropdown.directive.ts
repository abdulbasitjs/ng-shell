import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input('appDropdown') appDropdown!: string;

  constructor(private renderer2: Renderer2, private elementRef: ElementRef) {}
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const targetSelctors = this.appDropdown
      .split(' ')
      .map((e) => `.${e}`)
      .join(',');
    const $els = document.querySelectorAll(targetSelctors);
    if (this.isOpen) {
      $els.forEach((el) => {
        this.renderer2.addClass(el, 'open');
      });
    } else {
      $els.forEach((el) => {
        this.renderer2.removeClass(el, 'open');
      });
    }
  }
}
