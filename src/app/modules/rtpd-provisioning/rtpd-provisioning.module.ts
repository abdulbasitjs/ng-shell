import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtpdProvisioningRoutingModule } from './rtpd-provisioning-routing.module';
import { RtpdProvisioningComponent } from './pages/rtpd-provisioning.component';


@NgModule({
  declarations: [
    RtpdProvisioningComponent
  ],
  imports: [
    CommonModule,
    RtpdProvisioningRoutingModule
  ]
})
export class RtpdProvisioningModule { }
