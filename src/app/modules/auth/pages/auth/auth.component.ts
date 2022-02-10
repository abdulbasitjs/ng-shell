import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  host: {
    class: 'auth',
  },
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
