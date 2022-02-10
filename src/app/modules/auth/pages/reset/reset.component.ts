import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { UIMESSAGES } from '@configs/ui.messages';
import { catchError, of } from 'rxjs';
import { SSOResponse } from '@shared/models/http-response.model';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ResetComponent implements OnInit {
  error = null;
  UIMSG = UIMESSAGES;
  isPasswordReset: boolean = false;
  resetForm!: FormGroup;
  _verifyToken!: string;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      cPassword: new FormControl('', [Validators.required]),
    });
    const { key = '' } = this.route.snapshot.queryParams;
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

  gotoLogin() {
    this.router.navigate(['..', 'login'], { relativeTo: this.route });
  }
}
