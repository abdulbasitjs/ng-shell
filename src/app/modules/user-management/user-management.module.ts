import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { AppSideBarModule } from '@shared/components/app-side-bar/app-side-bar.module';
import { UsersComponent } from './pages/users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSectionTitleModule } from '@shared/components/app-section-title/app-section-title.module';
import { AppButtonModule } from '@shared/components/app-btn/app-button.module';
import { AppDataTableModule } from '@shared/components/app-data-table/app-data-table.module';
import { AppPaginationModule } from '@shared/components/app-pagination/app-pagination.module';
import { AppPanelModule } from '@shared/components/app-panel/app-panel.module';
import { AppDropdownModule } from '@shared/components/app-dropdown/app-dropdown.module';
import { InviteUserComponent } from './components/invite/invite.component';

@NgModule({
  declarations: [UserManagementComponent, UsersComponent, InviteUserComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    AppSideBarModule,
    AppSectionTitleModule,
    AppButtonModule,
    AppDataTableModule,
    AppPaginationModule,
    AppPanelModule,
    AppDropdownModule,
  ],
})
export class UserManagementModule {}
