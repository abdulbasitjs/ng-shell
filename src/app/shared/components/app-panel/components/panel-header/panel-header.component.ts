import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
  exportAs: 'panelHeader'
})
export class PanelHeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() clearIcon = '';
  @Output() onPanelClose: EventEmitter<void> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.onPanelClose.emit();
  }
}
