import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { AppSideBarModule } from '@shared/components/app-side-bar/app-side-bar.module';
import { AppSectionTitleModule } from '@shared/components/app-section-title/app-section-title.module';
import { AppButtonModule } from '@shared/components/app-btn/app-button.module';
import { AppPanelModule } from '@shared/components/app-panel/app-panel.module';
import { AppDropdownModule } from '@shared/components/app-dropdown/app-dropdown.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { UserProfileContainerComponent } from './pages/user-profile-container/user-profile-container.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { UserProfileEditComponent } from './components/edit/edit.component';
import { UserProfileChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    UserProfileContainerComponent,
    ProfileDetailComponent,
    UserProfileEditComponent,
    UserProfileChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    AppSideBarModule,
    AppSectionTitleModule,
    AppButtonModule,
    AppPanelModule,
    AppDropdownModule,
    DirectivesModule,
    NgxSkeletonLoaderModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [],
})
export class UserProfileModule {}
