import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  host: {
    class: 'login',
  },
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    if (email && password) {
      this.authService.login(email, password);
    }
  }
}
