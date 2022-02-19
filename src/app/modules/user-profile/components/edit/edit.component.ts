import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UIMESSAGES } from '@configs/index';
import { LoaderService } from '@core/services/loader.service';
import { Subscription } from 'rxjs';
import { OverlayService } from '@core/services/overlay.service';
import { IUserItem } from 'src/app/modules/user-management/user-management.model';
import { ProfileService } from '../../services/profile-management.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './edit.component.html',
})
export class UserProfileEditComponent implements OnInit, OnDestroy {
  UIMSG = UIMESSAGES;
  isPanelOpen: boolean = true;
  editProfileForm!: FormGroup;
  currentUser!: IUserItem;

  userSubscription!: Subscription;
  shouldRenderSuccessScreeen = false;
  isProfileUpdating = false;

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
    this.editProfileForm = this.formBuilder.group({
      full_name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    this.profileService.getCurrentUserObservable().subscribe((user) => {
      this.populateEditForm(user);
    });
  }

  populateEditForm(user: IUserItem | null) {
    this.editProfileForm.patchValue({
      full_name: user?.name,
      email: user?.email,
    });
  }

  onProfileUpdate() {
    this.isProfileUpdating = true;
    const { full_name: name } = this.editProfileForm.value;
    this.profileService.updateProfile(name).subscribe((d: any) => {
      this.isProfileUpdating = false;
      if (d && !d.error) this.shouldRenderSuccessScreeen = true;
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
