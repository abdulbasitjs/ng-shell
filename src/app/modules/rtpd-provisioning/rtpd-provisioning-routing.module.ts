import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RtpdProvisioningComponent } from './pages/rtpd-provisioning.component';

const routes: Routes = [{ path: '', component: RtpdProvisioningComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RtpdProvisioningRoutingModule {}
