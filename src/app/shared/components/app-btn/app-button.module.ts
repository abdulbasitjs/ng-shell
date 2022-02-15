import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ButtonComponent } from './components/button/button.component';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, DirectivesModule, AngularSvgIconModule],
  exports: [ButtonComponent],
})
export class AppButtonModule {}
