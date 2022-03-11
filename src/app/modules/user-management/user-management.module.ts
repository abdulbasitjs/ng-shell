import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AngularSvgIconModule } from 'angular-svg-icon';

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
import { DirectivesModule } from '@shared/directives/directives.module';
import { AssignedPortalComponent } from './components/assigned-portal/assigned-portal.component';
import { AppSearchModule } from '@shared/components/app-search/app-search.module';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { AppModalModule } from '@shared/components/app-modal/app-modal.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    InviteUserComponent,
    UserDetailComponent,
    AssignedPortalComponent,
  ],
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
    DirectivesModule,
    NgxSkeletonLoaderModule,
    AppSearchModule,
    AngularSvgIconModule.forRoot(),
    AppModalModule,
    PipesModule,
    DirectivesModule,
    TooltipModule
  ],
  exports: [AssignedPortalComponent],
})
export class UserManagementModule {}
