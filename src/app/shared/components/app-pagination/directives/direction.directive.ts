import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[dropdownDirection]',
  exportAs: 'dropdownDirection',
})
export class DropdownDirectionDirective {
  direction = 1;
  @Input('isOpen') set isOepn(state: boolean) {
    const pagingList$ = <Element>(
      document.querySelector('.pagination__perpage--list')
    );

    if (state) {
      this.direction =
        window.innerHeight - pagingList$.getBoundingClientRect().bottom <
        pagingList$.scrollHeight
          ? -1
          : 1;
    }
  }
}
