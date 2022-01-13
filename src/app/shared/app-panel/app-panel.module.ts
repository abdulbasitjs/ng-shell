import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { PanelComponent } from './components/panel/panel.component';

@NgModule({
  declarations: [PanelComponent],
  imports: [CommonModule, DirectivesModule],
exports: [PanelComponent],
})
export class AppPanelModule {}
