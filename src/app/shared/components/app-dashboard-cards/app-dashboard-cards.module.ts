import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { DashboardItemComponent } from './components/dashboard-item/dashboard-item.component';

@NgModule({
  declarations: [
    DashboardListComponent,
    DashboardItemComponent,
  ],
  imports: [CommonModule],
  exports: [DashboardListComponent, DashboardItemComponent],
})
export class DashboardCardsModule {}
