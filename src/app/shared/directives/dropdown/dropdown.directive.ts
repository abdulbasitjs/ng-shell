import {
  Directive,
  HostListener,
  HostBinding,
  Input,
  Renderer2,
  OnInit,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  exportAs: 'dropdown',
})
export class DropdownDirective implements OnInit {
  @Input() direction!: number;
  @Input('appDropdown') appDropdown!: string;
  @HostBinding('class.open') isOpen = false;
  @Input('top') shouldSetTopStyle = true;
  targetSelector!: string;

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

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

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  public open() {
    this.isOpen = true;
    if (this.targetSelector !== '.') {
      const $els = document.querySelectorAll(this.targetSelector);
      $els.forEach((el) => {
        this.renderer2.addClass(el, 'open');
        if (this.shouldSetTopStyle) {
          const triggerEl = el.parentElement?.parentElement;
          const triggerElHeight =
            triggerEl?.getBoundingClientRect().height || 20;
          const top = 14 + triggerElHeight + 'px';
          this.renderer2.setStyle(el, 'top', top);
        }
      });
    }
  }

  public close() {
    this.isOpen = false;
    if (this.targetSelector !== '.') {
      this.isOpen = false;
      const $els = document.querySelectorAll(this.targetSelector);
      $els.forEach((el) => {
        this.renderer2.removeClass(el, 'open');
      });
    }
  }
}
