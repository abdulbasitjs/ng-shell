import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '@core/guards/role.guard';
import { AppCustomerAddEditComponent } from './components/customer-add-edit/customer-add-edit.component';
import { AppPackageAddEditComponent } from './components/package-add-edit/package-add-edit.component';
import { AppCustomerQuotaEditComponent } from './components/quota-edit/quota-edit.component';
import { OtiProvisioningCustomerDetailComponent } from './pages/oti-provisioning-customer-detail/oti-provisioning-customer-detail.component';
import { OtiProvisioningCustomersComponent } from './pages/oti-provisioning-customers/oti-provisioning-customers.component';
import { OtiProvisioningPackageDetailComponent } from './pages/oti-provisioning-package-detail/oti-provisioning-package-detail.component';
import { OtiProvisioningPackagesComponent } from './pages/oti-provisioning-packages/oti-provisioning-packages.component';
import { OtiProvisioningComponent } from './pages/oti-provisioning/oti-provisioning.component';

const routes: Routes = [
  {
    path: '',
    component: OtiProvisioningComponent,
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      {
        path: 'customers',
        component: OtiProvisioningCustomersComponent,
        children: [
          {
            canActivate: [RoleGuard],
            data: {
              expectedRoles: ['superadmin', 'admin', 'sales-op'],
            },
            path: 'add',
            component: AppCustomerAddEditComponent,
          },
        ],
      },
      {
        path: 'customers/:id',
        component: OtiProvisioningCustomerDetailComponent,
        children: [
          {
            canActivate: [RoleGuard],
            data: {
              expectedRoles: ['superadmin', 'admin', 'sales-op'],
            },
            path: 'company/:mode',
            component: AppCustomerAddEditComponent,
          },
          {
            canActivate: [RoleGuard],
            data: {
              expectedRoles: ['superadmin', 'admin', 'sales-op'],
            },
            path: 'company-quota/:mode',
            component: AppCustomerQuotaEditComponent,
          },
        ],
      },
      {
        path: 'packages',
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['superadmin'],
        },
        component: OtiProvisioningPackagesComponent,
        children: [{ path: 'add', component: AppPackageAddEditComponent }],
      },
      {
        canActivate: [RoleGuard],
        data: {
          expectedRoles: ['superadmin'],
        },
        path: 'packages/:id',
        component: OtiProvisioningPackageDetailComponent,
        children: [
          { path: 'package/:mode', component: AppPackageAddEditComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtiProvisioningRoutingModule {}
