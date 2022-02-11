import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-auth-section',
  template: `
    <p class="auth--form__section--title">{{ title }}</p>
    <p class="auth--form__section--description">{{ description }}</p>
  `,
  styleUrls: ['./auth-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSectionComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  constructor() {}

  ngOnInit(): void {}
}
