import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppButtonModule } from '@shared/app-btn/app-button.module';
import { PanelComponent } from './components/panel/panel.component';
import { PanelHeaderComponent } from './components/panel-header/panel-header.component';
import { PanelFooterComponent } from './components/panel-footer/panel-footer.component';

@NgModule({
  declarations: [PanelComponent, PanelHeaderComponent, PanelFooterComponent],
  imports: [CommonModule, DirectivesModule, AppButtonModule],
  exports: [PanelComponent, PanelHeaderComponent, PanelFooterComponent],
})
export class AppPanelModule {}
