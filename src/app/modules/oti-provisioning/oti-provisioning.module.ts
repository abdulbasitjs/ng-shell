import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtiProvisioningRoutingModule } from './oti-provisioning-routing.module';
import { OtiProvisioningComponent } from './pages/oti-provisioning/oti-provisioning.component';
import { AppSideBarModule } from '@shared/components/app-side-bar/app-side-bar.module';
import { OtiProvisioningCustomersComponent } from './pages/oti-provisioning-customers/oti-provisioning-customers.component';
import { OtiProvisioningCustomerDetailComponent } from './pages/oti-provisioning-customer-detail/oti-provisioning-customer-detail.component';
import { OtiProvisioningPackagesComponent } from './pages/oti-provisioning-packages/oti-provisioning-packages.component';
import { AppSectionTitleModule } from '@shared/components/app-section-title/app-section-title.module';
import { AppButtonModule } from '@shared/components/app-btn/app-button.module';
import { AppDataTableModule } from '@shared/components/app-data-table/app-data-table.module';
import { AppPaginationModule } from '@shared/components/app-pagination/app-pagination.module';
import { AppPanelModule } from '@shared/components/app-panel/app-panel.module';
import { AppWizardModule } from '@shared/components/app-wizard/app-wizard.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppDropdownModule } from '@shared/components/app-dropdown/app-dropdown.module';

@NgModule({
  declarations: [
    OtiProvisioningComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningCustomerDetailComponent,
    OtiProvisioningPackagesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OtiProvisioningRoutingModule,
    AppSideBarModule,
    AppSectionTitleModule,
    AppButtonModule,
    AppDataTableModule,
    AppPaginationModule,
    AppPanelModule,
    AppWizardModule,
    AppDropdownModule
  ],
})
export class OtiProvisioningModule {}
