import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsoDashboardComponent } from './components/sso-dashboard/sso-dashboard.component';
import { DashboardCardsModule } from '@shared/app-dashboard-cards/app-dashboard-cards.module';


@NgModule({
  declarations: [SsoDashboardComponent],
  imports: [
    CommonModule,
    DashboardCardsModule
  ],
  exports: [SsoDashboardComponent]
})
export class SsoDashboardModule { }
