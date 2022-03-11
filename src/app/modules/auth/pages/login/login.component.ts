import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UIMESSAGES } from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { ProjectStatusCode } from '@core/http/http-codes.enum';
import { SSOResponse } from '@core/http/http-response.model';
import { LoaderService } from '@core/services/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'auth--form',
  },
})
export class LoginComponent implements OnInit {
  hasError = false;
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
      this.authService.login(email, password, isRemember).subscribe((res) => {
        const response = <SSOResponse>res;
        if (response.code === ProjectStatusCode.AccessRevoked) {
          this.hasError = true;
        }
      });
    }
  }

  get passwordControl() {
    return this.loginForm.controls['password'] as FormControl;
  }
}
// Validators.pattern(/^([a-zA-Z0-9!@#$%^&*_])+$/),
