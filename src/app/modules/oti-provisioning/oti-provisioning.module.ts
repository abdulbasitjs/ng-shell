import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

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
import { AppDropdownModule } from '@shared/components/app-dropdown/app-dropdown.module';
import { AppRangeButtonModule } from '@shared/components/app-range-btn/app-range-button.module';
import { OtiProvisioningPackageDetailComponent } from './pages/oti-provisioning-package-detail/oti-provisioning-package-detail.component';
import { AppModalModule } from '@shared/components/app-modal/app-modal.module';
import { AppDownloadReportComponent } from './components/download-report/download-report.component';
import { AppScanDateComponent } from './components/scan-date/scan-date.component';
import { UrlScannedComponent } from './components/url-scanned/url-scanned.component';
import { ApiPerLimitComponent } from './components/api-per-limit/api-per-limit.component';
import { ApiUsageComponent } from './components/api-usage/api-usage.component';
import { AppCustomerAddEditComponent } from './components/customer-add-edit/customer-add-edit.component';
import { AppPackageAddEditComponent } from './components/package-add-edit/package-add-edit.component';
import { AppSearchModule } from '@shared/components/app-search/app-search.module';
import { ApiTierComponent } from './components/api-tier/api-tier.component';
import { AppPackageControlsComponent } from './components/package-controls/package-controls.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DirectivesModule } from '@shared/directives/directives.module';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    OtiProvisioningComponent,
    OtiProvisioningCustomersComponent,
    OtiProvisioningCustomerDetailComponent,
    OtiProvisioningPackagesComponent,
    OtiProvisioningPackageDetailComponent,
    AppDownloadReportComponent,
    AppScanDateComponent,
    UrlScannedComponent,
    ApiPerLimitComponent,
    ApiUsageComponent,
    AppCustomerAddEditComponent,
    AppPackageAddEditComponent,
    ApiTierComponent,
    AppPackageControlsComponent
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
    AppDropdownModule,
    AppRangeButtonModule,
    AppModalModule,
    NgxDaterangepickerMd,
    FormsModule,
    AngularSvgIconModule,
    AppSearchModule,
    NgxSkeletonLoaderModule,
    DirectivesModule,
    PipesModule
  ],
})
export class OtiProvisioningModule {}
