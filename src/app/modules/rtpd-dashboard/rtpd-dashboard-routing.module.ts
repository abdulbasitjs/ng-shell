import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RtpdDashboardComponent } from './pages/rtpd-dashboard.component';

const routes: Routes = [{ path: '', component:  RtpdDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class RtpdDashboardRoutingModule { }
