import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSvg]',
})
export class SvgDirective implements AfterContentInit {
  @Input() public src = '';
  @Input() public shouldRemoveParent = true;

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient
  ) {}

  ngAfterContentInit() {
    this.http
      .get(this.src, {
        responseType: 'text',
        headers: { assets: 'snx-local-svg' },
      })
      .subscribe((svg) => {
        const el = this.shouldRemoveParent
          ? this.elementRef.nativeElement.parentElement
          : this.elementRef.nativeElement;
        el.insertAdjacentHTML('beforeend', svg);
      });
  }
}
