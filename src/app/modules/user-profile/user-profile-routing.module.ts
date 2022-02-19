import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { UserProfileContainerComponent } from './pages/user-profile-container/user-profile-container.component';
import { UserProfileEditComponent } from './components/edit/edit.component';
import { UserProfileChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileContainerComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileDetailComponent,
        children: [
          { path: 'edit', component: UserProfileEditComponent },
          {
            path: 'change-password',
            component: UserProfileChangePasswordComponent,
          },
        ],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
