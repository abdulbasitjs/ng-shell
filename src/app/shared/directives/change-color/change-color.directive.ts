import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

@Directive({
  selector: '[changeColor]',
})
export class ChangeColorDirective implements OnInit {
  @Input('changeColor') changeColor!: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {}
}
