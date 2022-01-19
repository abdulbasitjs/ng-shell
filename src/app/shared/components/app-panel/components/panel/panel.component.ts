import { Component, Input, OnInit } from '@angular/core';
import { PanelService } from '../../app-panel.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  showPanel!: Observable<any>
  constructor(private panelService: PanelService) {}

  ngOnInit(): void {
    this.showPanel = this.panelService.getShowNav();
  }
}
