import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  Renderer2,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'dropdown',
})
export class DropdownDirective implements OnInit {
  @Input('appDropdown') appDropdown!: string;
  @HostBinding('class.open') isOpen = false;
  targetSelector!: string;

  constructor(private renderer2: Renderer2) {}

  ngOnInit(): void {
    if (!this.appDropdown.includes(' > ')) {
      this.targetSelector = this.appDropdown
        .split(' ')
        .map((e) => `.${e}`)
        .join(',');
    } else {
      this.targetSelector = this.appDropdown;
    }
  }

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  }

  public open() {
    this.isOpen = true;
    if (this.targetSelector !== '.') {
      const $els = document.querySelectorAll(this.targetSelector);
      $els.forEach((el) => {
        this.renderer2.addClass(el, 'open');
      });
    }
  }

  public close() {
    if (this.targetSelector !== '.') {
      this.isOpen = false;
      const $els = document.querySelectorAll(this.targetSelector);
      $els.forEach((el) => {
        this.renderer2.removeClass(el, 'open');
      });
    }
  }
}
