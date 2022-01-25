import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './svg/svg.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { AccessControlDirective } from './access-control/access-control.directive';

@NgModule({
  declarations: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
  ],
  imports: [CommonModule],
  exports: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
  ],
})
export class DirectivesModule {}
