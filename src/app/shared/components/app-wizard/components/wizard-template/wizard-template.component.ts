import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PanelService } from '@shared/components/app-panel/app-panel.service';

import { Subscription } from 'rxjs';
import { StepModel } from '../../interfaces/wizard';

@Component({
  selector: '[app-wizard-template]',
  templateUrl: './wizard-template.component.html',
  styleUrls: ['./wizard-template.component.scss'],
})
export class WizardTemplateComponent
  implements OnInit, AfterContentInit, OnDestroy
{
  @Input() step!: StepModel;
  animationSubscription!: Subscription;

  constructor(
    private el: ElementRef,
    private rendrer: Renderer2,
    private panelService: PanelService
  ) {}

  ngOnDestroy(): void {
    this.animationSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.animationSubscription = this.panelService
      .getCurrentAction()
      .subscribe((e) => {
        const direction =
          e === 'next' ? 'fadeInOutForward' : 'fadeInOutBackward';
        this.rendrer.setStyle(
          this.el.nativeElement,
          'animation',
          `fadeInOutForward 150ms cubic-bezier(0, 0, 0.2, 1)`
        );
      });
  }

  ngOnInit(): void {}

  onCompleteStep() {
    if (this.step) {
      this.step.isComplete = true;
    }
  }
}
