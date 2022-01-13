import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtiProvisioningCustomersComponent } from '@features/oti-provisioning/components/customers/customers.component';
import { OtiProvisioningPackagesComponent } from '@features/oti-provisioning/components/packages/packages.component';
import { OtiProvisioningPageComponent } from './oti-provisioning-page.component';

const routes: Routes = [
  {
    path: '',
    component: OtiProvisioningPageComponent,
    children: [
      { path: '', redirectTo: 'customers' },
      { path: 'customers', component: OtiProvisioningCustomersComponent },
      { path: 'packages', component: OtiProvisioningPackagesComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class HomePageRoutingModule {}
