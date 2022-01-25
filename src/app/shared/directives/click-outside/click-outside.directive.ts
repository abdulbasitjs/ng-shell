import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  public ngOnInit() {
    this.onDocumentClick = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.onDocumentClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  private onDocumentClick(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
