import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-action',
  templateUrl: './auth-action.component.html',
  host: {
    class: 'auth--form__section'
  }
})
export class AuthActionComponent implements OnInit {
  @Input() error = null;
  @Input() icon = '';
  @Input() caption = '';
  @Output() onAction = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  gotoLogin() {
    this.router.navigateByUrl('/auth');
    this.onAction.emit();
  }
}
