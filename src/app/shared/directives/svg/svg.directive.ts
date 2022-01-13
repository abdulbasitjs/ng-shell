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
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private http: HttpClient
  ) {}

  ngAfterContentInit() {
    this.http.get(this.src, { responseType: 'text' }).subscribe((svg) => {
      const el = this.shouldRemoveParent
        ? this.elementRef.nativeElement.parentElement
        : this.elementRef.nativeElement;
      this.renderer2.setProperty(el, 'innerHTML', svg);
    });
  }
}
