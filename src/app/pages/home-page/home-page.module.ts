import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { HeadersModule } from '@features/headers/headers.module';
import { SsoDashboardModule } from '@features/sso-dashboard/sso-dashboard.module';
import { DashboardCardsModule } from '@shared/app-dashboard-cards/app-dashboard-cards.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    HeadersModule,
    DashboardCardsModule,
    SsoDashboardModule,
  ],
})
export class HomePageModule {}
