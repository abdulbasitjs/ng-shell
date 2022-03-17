import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UIMESSAGES } from '@configs/index';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { SSOResponse } from '@core/http/http-response.model';
import { catchError, of } from 'rxjs';
import { HttpStatusCode, ProjectStatusCode } from '@core/http/http-codes.enum';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ForgotComponent implements OnInit {
  hasError = false;
  UIMSG = UIMESSAGES;
  forgotForm!: FormGroup;
  isEmailSent: boolean = false;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
        ),
      ]),
    });
  }

  onReset() {
    if (this.forgotForm.valid) {
      const { email } = this.forgotForm.value;
      if (email) {
        this.authService
          .forgot(email)
          .pipe(
            catchError((error) => {
              if (error.error.code === ProjectStatusCode.AccessRevoked) {
                this.hasError = true;
              }
              return of([]);
            })
          )
          .subscribe((res) => {
            const response = <SSOResponse>res;
            const { code } = response;
            if (code === HttpStatusCode.Ok) {
              this.hasError = false;
              this.isEmailSent = true;
            }
          });
      }
    }
  }
}
