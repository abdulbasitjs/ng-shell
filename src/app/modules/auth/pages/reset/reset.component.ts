import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { UIMESSAGES } from '@configs/index';
import { catchError, of } from 'rxjs';
import { SSOResponse } from '@core/http/http-response.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ResetComponent implements OnInit {
  public resetMode = '';
  sectionTitle = '';
  error = null;
  UIMSG = UIMESSAGES;
  isPasswordReset: boolean = false;
  resetForm!: FormGroup;
  _verifyToken!: string;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^([a-zA-Z0-9!@#$%^&*_])+$/),
      ]),
      cPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    const { key = '' } = this.route.snapshot.queryParams;
    this.resetMode = this.route.snapshot.url[0].path;
    this.sectionTitle =
      this.resetMode === 'invite' ? 'Generate Password' : 'New Password';
    this._verifyToken = key;
  }

  onResetPassword() {
    const { password, cPassword } = this.resetForm.value;
    if (password === cPassword) {
      this.authService
        .resetPassword(password, cPassword, this._verifyToken)
        .pipe(
          catchError((error) => {
            this.error = error.error.message;
            return of([]);
          })
        )
        .subscribe((res) => {
          const response = <SSOResponse>res;
          const { code } = response;
          if (code === 200) {
            this.error = null;
            this.isPasswordReset = true;
          }
        });
    } else return;
  }

  get passwordControl() {
    return this.resetForm.controls['password'] as FormControl;
  }
}
