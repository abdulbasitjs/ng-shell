import { Directive, Input, ElementRef, ViewChild } from '@angular/core';

@Directive({
  selector: '[dropdownDirection]',
  exportAs: 'dropdownDirection',
})
export class DropdownDirectionDirective {
  @ViewChild('.pagination__perpage--list') pageList!: ElementRef;
  direction = 1;
  @Input('isOpen') set isOepn(state: boolean) {

    const pagingList$ = <Element>(
      document.querySelector('.pagination__perpage--list')
    );


    if (state) {
      this.direction =
        window.innerHeight -  pagingList$.getBoundingClientRect().bottom <
        pagingList$.scrollHeight
          ? -1
          : 1;
    }

  }

  constructor(private el: ElementRef) {}
}
