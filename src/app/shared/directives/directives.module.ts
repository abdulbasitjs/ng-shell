import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './svg/svg.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';

@NgModule({
  declarations: [SvgDirective, DropdownDirective, ClickOutsideDirective],
  imports: [CommonModule],
  exports: [SvgDirective, DropdownDirective, ClickOutsideDirective],
})
export class DirectivesModule {}
