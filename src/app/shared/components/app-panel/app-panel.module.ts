import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';

import { PanelComponent } from './components/panel/panel.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';
import { PanelFooterComponent } from './components/panel-footer/panel-footer.component';
import { AppButtonModule } from '../app-btn/app-button.module';

@NgModule({
  declarations: [PanelComponent, PanelHeaderComponent, PanelFooterComponent],
  imports: [CommonModule, DirectivesModule, AppButtonModule],
  exports: [PanelComponent, PanelHeaderComponent, PanelFooterComponent],
})
export class AppPanelModule {}
