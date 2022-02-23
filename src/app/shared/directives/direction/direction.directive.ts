import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';

@Directive({
  selector: '[dropdownDirection]',
  exportAs: 'dropdownDirection',
})
export class DropdownDirectionDirective {
  @Output() onDirectionChange = new EventEmitter();
  @Input() selector!: string;
  direction = 1;
  @Input('isOpen') set isOepn(state: boolean) {
    const pagingList$ = <Element>document.querySelector(this.selector);

    if (state) {
      this.direction =
        window.innerHeight - pagingList$.getBoundingClientRect().bottom <
        pagingList$.scrollHeight
          ? -1
          : 1;
      this.onDirectionChange.emit(this.direction);
    }
  }
}
