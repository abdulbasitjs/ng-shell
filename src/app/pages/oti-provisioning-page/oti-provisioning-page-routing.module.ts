import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtiProvisioningCustomerDetailComponent } from '@features/oti-provisioning/components/customer-detail/customer-detail.component';
import { OtiProvisioningCustomersComponent } from '@features/oti-provisioning/components/customers/customers.component';
import { OtiProvisioningPackagesComponent } from '@features/oti-provisioning/components/packages/packages.component';
import { OtiProvisioningPageComponent } from './oti-provisioning-page.component';

const routes: Routes = [
  {
    path: '',
    component: OtiProvisioningPageComponent,
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: 'customers', component: OtiProvisioningCustomersComponent },
      { path: 'customers/:name', component: OtiProvisioningCustomerDetailComponent },
      { path: 'packages', component: OtiProvisioningPackagesComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class HomePageRoutingModule {}
