import { Component, Input, OnInit } from '@angular/core';
import { PanelService } from '@shared/app-panel/app-panel.service';

@Component({
  selector: 'app-panel-header',
  templateUrl: './panel-header.component.html',
})
export class PanelHeaderComponent implements OnInit {
  @Input() headerTitle = '';
  @Input() clearIcon = '';
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {}

  onClose() {
    this.panelService.setShowPanel(false);
  }
}
