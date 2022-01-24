import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { StepModel } from '../../interfaces/wizard';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit {
  @Input() steps!: StepModel[];
  @Input() currentStep!: StepModel;
  @Output() onStepChange: EventEmitter<StepModel> = new EventEmitter<StepModel>();

  constructor() {}

  ngOnInit(): void {}

  onStepClick(step: StepModel) {
    this.onStepChange.emit(step);
  }
}
