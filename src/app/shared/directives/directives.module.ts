import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './svg/svg.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { AccessControlDirective } from './access-control/access-control.directive';
import { ChangeColorDirective } from './change-color/change-color.directive';

@NgModule({
  declarations: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
    ChangeColorDirective,
  ],
  imports: [CommonModule],
  exports: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
    ChangeColorDirective,
  ],
})
export class DirectivesModule {}
