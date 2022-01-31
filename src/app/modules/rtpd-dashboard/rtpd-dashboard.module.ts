import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RtpdDashboardRoutingModule } from './rtpd-dashboard-routing.module';
import { RtpdDashboardComponent } from './pages/rtpd-dashboard.component';


@NgModule({
  declarations: [
    RtpdDashboardComponent
  ],
  imports: [
    CommonModule,
    RtpdDashboardRoutingModule
  ]
})
export class RtpdDashboardModule { }
