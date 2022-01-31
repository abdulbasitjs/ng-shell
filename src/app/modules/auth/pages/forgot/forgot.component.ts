import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ForgotComponent implements OnInit {
  forgotForm!: FormGroup;
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

  onLogin() {
    const { email } = this.forgotForm.value;
    if (email) {
      this.authService.forgot(email);
    }
  }

  gotoLogin() {
    this.router.navigate(['..', 'login'], { relativeTo: this.route });
  }
}
