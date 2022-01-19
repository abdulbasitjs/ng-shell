import { Component, OnInit } from '@angular/core';
import { PanelService } from '../../app-panel.service';
import { FooterActionState } from '../../interfaces/panel';

@Component({
  selector: 'app-panel-footer',
  templateUrl: './panel-footer.component.html',
})
export class PanelFooterComponent implements OnInit {
  public btnState!: FooterActionState;
  constructor(
    private panelService: PanelService
  ) {}

  ngOnInit(): void {
    this.panelService.getCurrentActionState().subscribe((state) => {
      this.btnState = state;
    });
  }

  onAction(type: string) {
    this.panelService.notifyAction(type);
  }
}
