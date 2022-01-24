import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  @Input() showPanel: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}