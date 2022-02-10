import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES } from '@configs/ui.messages';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';
import { SSOResponse } from '@shared/models/http-response.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ForgotComponent implements OnInit {
  error = null;
  UIMSG = UIMESSAGES;
  forgotForm!: FormGroup;
  isEmailSent: boolean = false;
  constructor(
    private authService: AuthenticationService,
    public loaderService: LoaderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onReset() {
    const { email } = this.forgotForm.value;
    if (email) {
      this.authService.forgot(email)
      .pipe(catchError(error => {
        this.error = error.error.message;
        return of([]);
      }))
      .subscribe((res) => {
        const response = <SSOResponse>res;
        const { code } = response;
        if (code === 200) {
          this.error = null;
          this.isEmailSent = true;
        }
      });
    }
  }

  gotoLogin() {
    this.router.navigate(['..', 'login'], { relativeTo: this.route });
  }
}
