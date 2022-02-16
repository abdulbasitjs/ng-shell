import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from './components/modal/modal.component';
import { AppModalHeaderComponent } from './components/modal-header/modal-header.component';
import { AppModalBodyComponent } from './components/modal-body/modal-body.component';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppButtonModule } from '../app-btn/app-button.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppModalHeaderComponent,
    AppModalBodyComponent,
    AppModalComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    AppButtonModule,
    AngularSvgIconModule,
  ],
  exports: [AppModalHeaderComponent, AppModalBodyComponent, AppModalComponent],
  providers: [],
})
export class AppModalModule {}
