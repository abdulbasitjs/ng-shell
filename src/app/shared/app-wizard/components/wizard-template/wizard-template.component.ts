import { Component, Input, OnInit } from '@angular/core';
import { StepModel } from '@shared/app-wizard/interfaces/wizard';

@Component({
  selector: 'app-wizard-template',
  templateUrl: './wizard-template.component.html',
})
export class WizardTemplateComponent implements OnInit {
  @Input() step!: StepModel;

  constructor() {}

  ngOnInit(): void {}

  onCompleteStep() {
    if (this.step) {
      this.step.isComplete = true;
    }
  }
}
