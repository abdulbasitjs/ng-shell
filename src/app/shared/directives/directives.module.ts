import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgDirective } from './svg/svg.directive';
import { DropdownDirective } from './dropdown/dropdown.directive';
import { ClickOutsideDirective } from './click-outside/click-outside.directive';
import { AccessControlDirective } from './access-control/access-control.directive';
import { ChangeColorDirective } from './change-color/change-color.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DigitOnlyDirective } from './digit-only/digit-only.directive';

@NgModule({
  declarations: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
    ChangeColorDirective,
    PlaceholderDirective,
    DigitOnlyDirective,
  ],
  imports: [CommonModule],
  exports: [
    SvgDirective,
    DropdownDirective,
    ClickOutsideDirective,
    AccessControlDirective,
    ChangeColorDirective,
    PlaceholderDirective,
    DigitOnlyDirective,
  ],
})
export class DirectivesModule {}
