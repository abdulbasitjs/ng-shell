import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './svg/svg.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';

@NgModule({
  declarations: [SvgDirective, DropdownDirective],
  imports: [CommonModule],
  exports: [SvgDirective, DropdownDirective],
})
export class DirectivesModule {}
