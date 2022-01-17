import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '@shared/directives/directives.module';
import { AppButtonModule } from '@shared/app-btn/app-button.module';
import { WizardComponent } from './components/wizard/wizard.component';
import { WizardTemplateComponent } from './components/wizard-template/wizard-template.component';

@NgModule({
  declarations: [WizardComponent, WizardTemplateComponent],
  imports: [CommonModule, DirectivesModule, AppButtonModule],
  exports: [WizardComponent, WizardTemplateComponent],
})
export class AppWizardModule {}
