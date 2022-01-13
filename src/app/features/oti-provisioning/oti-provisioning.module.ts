import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtiProvisioningCustomersComponent } from './components/customers/customers.component';
import { OtiProvisioningDashboardComponent } from './components/oti-provisioning-dashboard/oti-provisioning-dashboard.component';
import { OtiProvisioningPackagesComponent } from './components/packages/packages.component';
import { AppSectionTitleModule } from '@shared/app-section-title/app-section-title.module';
import { AppButtonModule } from '@shared/app-btn/app-button.module';
import { AppDataTableModule } from '@shared/app-data-table/app-data-table.module';
import { AppPaginationModule } from '@shared/app-pagination/app-pagination.module';
import { AppPanelModule } from '@shared/app-panel/app-panel.module';

@NgModule({
  declarations: [
    OtiProvisioningDashboardComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningPackagesComponent,
  ],
  imports: [
    CommonModule,
    AppSectionTitleModule,
    AppButtonModule,
    AppDataTableModule,
    AppPaginationModule,
    AppPanelModule
  ],
  exports: [
    OtiProvisioningDashboardComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningPackagesComponent,
  ],
})
export class OtiProvisioningModule {}
