import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@core/authentication/authentication.service';
import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  host: {
    class: 'auth--form',
  },
})
export class ResetComponent implements OnInit {
  isPasswordReset:boolean = false;
  resetForm!: FormGroup;
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
  }

  onResetPassword() {
    const { password, cPassword } = this.resetForm.value;
    if (password === cPassword) {
      this.authService.resetPassword(password);
      this.isPasswordReset = true;
    } else return;
  }

  gotoLogin() {
    this.router.navigate(['..', 'login'], { relativeTo: this.route });
  }
}
