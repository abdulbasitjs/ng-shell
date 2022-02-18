import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-overlay',
  templateUrl: './app-overlay.component.html',
})
export class OverlayComponent implements OnInit {
  @Input() showOverlay: boolean | null = false;
  @Input() bgColor!: string;
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
