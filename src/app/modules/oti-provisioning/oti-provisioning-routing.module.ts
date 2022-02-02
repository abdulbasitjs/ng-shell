import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
      { path: 'customers', component: OtiProvisioningCustomersComponent },
      {
        path: 'customers/:name',
        component: OtiProvisioningCustomerDetailComponent,
      },
      { path: 'packages', component: OtiProvisioningPackagesComponent },
      {
        path: 'packages/:name',
        component: OtiProvisioningPackageDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtiProvisioningRoutingModule {}
