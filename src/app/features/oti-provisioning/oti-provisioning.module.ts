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
import { AppWizardModule } from '@shared/app-wizard/app-wizard.module';
import { CoreModule } from '@core/core.module';
import { OtiProvisioningCustomerDetailComponent } from './components/customer-detail/customer-detail.component';

@NgModule({
  declarations: [
    OtiProvisioningDashboardComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningPackagesComponent,
    OtiProvisioningCustomerDetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AppSectionTitleModule,
    AppButtonModule,
    AppDataTableModule,
    AppPaginationModule,
    AppPanelModule,
    AppWizardModule
  ],
  exports: [
    OtiProvisioningDashboardComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningPackagesComponent,
    OtiProvisioningCustomerDetailComponent
  ],
})
export class OtiProvisioningModule {}
