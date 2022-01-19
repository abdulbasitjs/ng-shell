import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { StepsService } from '../../app-wizard-data.service';
import { StepModel } from '../../interfaces/wizard';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
})
export class WizardComponent implements OnInit {
  @Input() stepData!: string[];

  steps$!: Observable<StepModel[]>;
  currentStep$!: Observable<StepModel>;

  constructor(private stepsService: StepsService) {}

  ngOnInit(): void {
    this.steps$ = this.stepsService.getSteps();
    this.currentStep$ = this.stepsService.getCurrentStep();
  }

  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }
}
