import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule, DirectivesModule],
  exports: [DropdownComponent],
})
export class AppDropdownModule {}
