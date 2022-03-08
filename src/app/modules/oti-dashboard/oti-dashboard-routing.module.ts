import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtiDashboardComponent } from './pages/oti-dashboard/oti-dashboard.component';

const routes: Routes = [
  { path: '', 
  component: OtiDashboardComponent 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class OtiDashboardRoutingModule { }
