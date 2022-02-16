import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, DirectivesModule, AngularSvgIconModule],
  exports: [DropdownComponent],
})
export class AppDropdownModule {}
