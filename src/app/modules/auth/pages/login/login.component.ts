import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UIMESSAGES } from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'auth--form',
  },
})
export class LoginComponent implements OnInit {
  UIMSG = UIMESSAGES;
  loginForm!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      isRemember: new FormControl(),
    });
  }

  onLogin() {
    const { email, password, isRemember } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password, isRemember);
    }
  }
}
