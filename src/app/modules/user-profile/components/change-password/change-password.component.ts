import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES } from '@configs/index';
import { LoaderService } from '@core/services/loader.service';
import { OverlayService } from '@core/services/overlay.service';
import { ProfileService } from '../../services/profile-management.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './change-password.component.html',
})
export class UserProfileChangePasswordComponent implements OnInit, OnDestroy {
  UIMSG = UIMESSAGES;
  isPanelOpen: boolean = true;
  changePasswordForm!: FormGroup;
  shouldRenderSuccessScreeen = false;
  isPasswordUpdating!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public profileService: ProfileService,
    public loaderService: LoaderService,
    private overlayService: OverlayService
  ) {}

  ngOnDestroy(): void {
    this.overlayService.hideOverlay();
  }

  ngOnInit(): void {
    this.overlayService.showOverlay();
    this.changePasswordForm = this.formBuilder.group({
      current: [null, Validators.required],
      password: [null, [Validators.required]],
      cPassword: [null, [Validators.required]],
    });
  }

  onPasswordUpdate() {
    this.isPasswordUpdating = true;
    const {
      current: currentPassword,
      password,
      cPassword: passwordConfirmation,
    } = this.changePasswordForm.value;
    this.profileService
      .updatePassword({ currentPassword, password, passwordConfirmation })
      .subscribe((d: any) => {
        this.isPasswordUpdating = false;
        this.shouldRenderSuccessScreeen = true;
      });
  }

  onSave() {
    this.onClose();
  }

  onClose() {
    this.isPanelOpen = false;
    const backPath = '../';
    this.router.navigate([backPath], { relativeTo: this.route });
  }
}
