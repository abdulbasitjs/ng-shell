import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-auth-section',
  template: `
    <p class="auth--form__section--title">{{ caption }}</p>
    <p class="auth--form__section--description">{{ description }}</p>
  `,
  styleUrls: ['./auth-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSectionComponent implements OnInit {
  @Input() caption!: string;
  @Input() description!: string;
  constructor() {}

  ngOnInit(): void {}
}
