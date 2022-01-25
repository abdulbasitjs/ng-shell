import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizardTemplateComponent } from './components/wizard-template/wizard-template.component';
import { AppButtonModule } from '../app-btn/app-button.module';

@NgModule({
  declarations: [WizardComponent, WizardTemplateComponent],
  imports: [CommonModule, DirectivesModule, AppButtonModule],
  exports: [WizardComponent, WizardTemplateComponent],
})
export class AppWizardModule {}
