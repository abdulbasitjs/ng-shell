import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtiDashboardRoutingModule } from './oti-dashboard-routing.module';
import { OtiDashboardComponent } from './pages/oti-dashboard/oti-dashboard.component';


@NgModule({
  declarations: [
    OtiDashboardComponent
  ],
  imports: [
    CommonModule,
    OtiDashboardRoutingModule
  ]
})
export class OtiDashboardModule { }
