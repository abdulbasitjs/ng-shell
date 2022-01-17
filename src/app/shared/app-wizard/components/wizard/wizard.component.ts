import { Component, Input, OnInit } from '@angular/core';
import { StepsService } from '@shared/app-wizard/app-wizard-data.service';
import { StepModel } from '@shared/app-wizard/interfaces/wizard';
import { Observable } from 'rxjs';

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
