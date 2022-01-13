import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardListComponent,
    DashboardItemComponent,
  ],
  imports: [CommonModule],
  exports: [DashboardComponent, DashboardListComponent, DashboardItemComponent],
})
export class DashboardCardsModule {}
