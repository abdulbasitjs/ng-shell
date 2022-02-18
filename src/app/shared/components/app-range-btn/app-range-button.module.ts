import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { ButtonRangeComponent } from './components/range-button/range-button.component';
import { AppButtonModule } from '../app-btn/app-button.module';

@NgModule({
  declarations: [ButtonRangeComponent],
  imports: [CommonModule, DirectivesModule, AppButtonModule, DirectivesModule],
  exports: [ButtonRangeComponent],
})
export class AppRangeButtonModule {}
