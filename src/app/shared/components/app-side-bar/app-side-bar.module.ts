import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from './components/sidebar/side-bar.component';
import { DirectivesModule } from '@shared/directives/directives.module';

@NgModule({
  declarations: [SideBarComponent],
  imports: [CommonModule, DirectivesModule],
  exports: [SideBarComponent, DirectivesModule],
})
export class AppSideBarModule {}
